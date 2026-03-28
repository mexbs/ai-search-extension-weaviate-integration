
import EventEmitter from 'events';
import http from 'http';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { initWeaviate } from "./models/weaviateProvider";
import morgan from 'morgan';
import {
    Logger,
    ApiValidationMiddleware,
    Helper,
    routesUtils,
  } from './utils';

import aiSearchEngineApiRoutes from './services/aiSearchEngineApi/routes';
import cors from 'cors';

import loadConfig from '../loadConfig';


export class AppManagement extends EventEmitter{
    private apiServer: http.Server;
    private weaviateClient;
    private status: 'READY' | 'STARTING' | 'STOPING' | 'STOP' = null;

    private setStatus(status){
        this.status = status;
    }
    private getStatus(){
        return this.status;
    }


    async start(){
        this.setStatus('STARTING');

        await initWeaviate();

        const app = express();
        
        setTimeout(() => {
            this.setStatus('READY');
            this.emit('appReady');
        }, 1000);

        const limiter = rateLimit({
            windowMs: 60 * 1000,
            max: 1000,
            handler: (req, res, next) => {
                console.warn(`${Helper.getCurrentUTCDateSqlFormat()} [Rate Limit Exceeded] ${req.ip} - ${req.method} ${req.originalUrl}`);
                res.status(429).json({ message: "Too many requests, please try again later." });
            }
        });

        if (loadConfig.isDevelopmentMode === true) {
            app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
          }

        
        app.use(limiter);
        app.set('trust proxy', 1)

        app.use((req, res, next) => {
            if ('OPTIONS' === req.method) {
                return res.send(204);
            }
            next();
        });
 
        app.use(
            express.json({ limit: '5mb' }
        ));


        morgan.token('body', (req: any) => { 
            return Helper.printObjectSummary(req.ycData);
        });
        morgan.token('remote-addr', (req: any) => { return Helper.getRemoteAddr(req) });
        app.use(morgan(':date[iso] :remote-addr :method :url :body :status :res[content-length] - :response-time ms'));

        app.use("/ai-search-engine", (req: any, res: any, next) => ApiValidationMiddleware.normalizeAndVerifyRequest(req, res, next), aiSearchEngineApiRoutes);
        
        app.use((err, req, res, next) => {
            return routesUtils.jsonResponseException(err, {}, res);
        });

        const port = loadConfig.runApp.port;
        this.apiServer = app.listen(port, '0.0.0.0', () => {
            console.log('Server listening on:', this.apiServer.address());
        });

        return this.apiServer; // for testing
    }


    async shutdown(): Promise<void> {
        if (!this.getStatus() || this.getStatus() === "STARTING") {
            Logger.info(`[shutdown sequence]:: Panic! Exit application before READY not start shutdown sequence.`);
            process.exit(1000);
        }
        if (this.getStatus() !== "READY") return;

        Logger.info(`[shutdown sequence]:: Started.`);
        this.setStatus("STOPING");
        this.apiServer.close();
        Logger.info(`[shutdown sequence]:: Shutdown operation performed successfully!`);
        this.setStatus("STOP");
        setTimeout(() => {
            process.exit(99);
        }, 100);
    }
}
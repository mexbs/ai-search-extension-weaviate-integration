import * as express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

import indexProducts from './webServices/indexProducts';
import search from './webServices/search';
import clearIndex from './webServices/clearIndex';
import clearProduct from './webServices/clearProduct';

router.post('/indexProducts', (req: Request, res: Response) => {
    indexProducts(req, res);
});

router.post('/search', (req: Request, res: Response) => {
    search(req, res);
});

router.post('/clearIndex', (req: Request, res: Response) => {
    clearIndex(req, res);
});

router.post('/clearProduct', (req: Request, res: Response) => {
    clearProduct(req, res);
});

export default router;

import express from 'express'
import { RezervacijaController } from '../controllers/rezervacije.controller';

const rezervacijaRouter = express.Router();

const multer=require('multer')
const upload=multer({dest:'./slike'})

rezervacijaRouter.route('/hadrez').post(
    (req, res)=>new RezervacijaController().hadrez(req, res)
)

rezervacijaRouter.route('/numofrez').get(
    (req, res)=>new RezervacijaController().numofrez(req, res)
)

rezervacijaRouter.route('/addrez').post(
    (req, res)=>new RezervacijaController().addrez(req, res)
)

rezervacijaRouter.route('/updaterez').post(
    (req, res)=>new RezervacijaController().updaterez(req, res)
)

rezervacijaRouter.route('/finishrez').post(
    (req, res)=>new RezervacijaController().finishrez(req, res)
)

rezervacijaRouter.route('/allbookrez').post(
    (req, res)=>new RezervacijaController().allbookrez(req, res)
)

rezervacijaRouter.route('/allbookrez1').post(
    (req, res)=>new RezervacijaController().allbookrez1(req, res)
)

export default rezervacijaRouter;
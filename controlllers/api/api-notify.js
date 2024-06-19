const Notify = require('../../models/Notify');





class ApiController {

 
    getAll(req, res, next) {
        const id_user = req.params.id_user;
        Notify.find({ id_user: id_user })
            .then((arr) => {
                res.json(arr);
            })
            .catch(err => res.json(null));
    }

    addNew = async(req, res, next)=>{
        const notify = req.body;
        try {
            Notify.create(notify);
            res.json(notify);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
}





module.exports = new ApiController;
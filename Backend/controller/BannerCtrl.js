const BannerModel = require("../model/BannerModel");
const banner_img_url = "http://localhost:8080/static/";

const addBannerImage = async (req, res) => {
    const { description } = req.body;

    if (!req.file) {
        return res.status(404).json({ message: "File not found" });
    }

    try {
        const newBanner = await BannerModel.create({
            bannerImage: banner_img_url + req.file.filename,
            description
        });
        res.status(201).json(newBanner); // Use status 201 for successful creation
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const viewBanners = async (req, res) => {
    try {
        const allBanners = await BannerModel.find({});
        res.status(200).json(allBanners); // Use status 200 for successful retrieval
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteBanner = async(req, res)=>{
    try {
        const delBanner = await BannerModel.findByIdAndDelete(req.params.id)
        if(!delBanner){
            return res.status(404).json({message:'Banner is Not found'})
        }
        res.status(200).json(`Deleted Banner ${delBanner}`)
    } catch (error) {
        res.status(500).json(`Cannot delete banner ${error}`)
    }
} 

module.exports = { addBannerImage, viewBanners, deleteBanner };

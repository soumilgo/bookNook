const {store,Resources}= require('../firebaseAdminConfig');
const {addResource,getAllResources,getResourceById, updateResource, updateResourceRating, deleteResource}=require('../models/resourceModel');
const multer=require('multer');
const storage=multer.memoryStorage();
const upload = multer({storage: storage});


const handleAddResource = async (req, res) => {
  try {
    // Handle file upload with multer
    upload.array('files',2)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: 'Failed to upload file12', details: err.message });
      }

      const files = req.files;
      const docFile=files.find((file)=>file.mimetype.includes('pdf'));
      const imageFile=files.find((file)=>file.mimetype.includes('jpg')||file.mimetype.includes('jpeg')||file.mimetype.includes('png'));
      if (docFile) {
        const bucket = store.bucket();
        const fileUpload = bucket.file(`document/${docFile.originalname}`);

        await fileUpload.save(docFile.buffer, {
          contentType: docFile.mimetype,
          public: true
        });

        let imageUrl = null;
        if (imageFile) {
          const imageUpload = bucket.file(`image/${imageFile.originalname}`);
          await imageUpload.save(imageFile.buffer, {
            contentType: imageFile.mimetype,
            public: true
          });
          imageUrlArray = await imageUpload.getSignedUrl({
            action: 'read',
            expires: '03-01-2500'
          });
          imageUrl = imageUrlArray[0];
        }

        const url = await fileUpload.getSignedUrl({
          action: 'read',
          expires: '03-01-2500'
        });

        const {genre,author,...rest}=req.body;
        const genreArray=genre.split(',').map((item)=>item.trim());
        const authorArray=author.split(',').map((item)=>item.trim());
        const userRating = 0;
        const numUserRated = 0;
        const views = 0;

        const data = {
          userRating: Number(userRating),
          numUserRated: Number(numUserRated),
          genre: genreArray,
          author: authorArray,
          imageUrl: imageUrl,
          ...rest,
          fileUrl: url[0],
          views: Number(0),
          createdAt: new Date().toISOString(),
        };

        const response = await addResource(data);
        res.status(response.status).json(response);
      } else {
        res.status(400).json({ msg: 'Failed to upload file'});
      }
    });
  } catch (error) {
    res.status(400).json({ msg: 'Failed to upload file111', details: error.message });
  }
};

const handleGetAllResources = async (req, res) => {
  const response = await getAllResources();
  res.status(response.status).json(response);
};

const handleGetResourceById = async (req, res) => {
  const id = req.params.id;
  const response = await getResourceById(id);
  res.status(response.status).json(response);
};

const handleUpdateResource = async (req, res) => {
  const id = req.params.id;
  try {
    upload.fields([
      { name: 'document', maxCount: 1 },
      { name: 'image', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: 'Failed to upload file1', details: err.message });
      }

      const docRef = Resources.doc(id);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        return res.status(404).json({ msg: 'Resource not found' });
      }

      const updates = {
        fileUrl: docSnap.data().fileUrl,
        imageUrl: docSnap.data().imageUrl
      };

      // Handle document update
      if (req.files['document']) {
        const documentFile = req.files['document'][0];
        const oldFileUrl = docSnap.data().fileUrl;
        const bucket = store.bucket();

        if (oldFileUrl) {
          const oldFileName = decodeURIComponent(oldFileUrl.split('/').pop().split('?')[0]);
          const oldFile = bucket.file(`document/${oldFileName}`);
          await oldFile.delete();
        }

        const fileUpload = bucket.file(`document/${documentFile.originalname}`);
        await fileUpload.save(documentFile.buffer, {
          contentType: documentFile.mimetype,
          public: true
        });

        const newFileUrl = await fileUpload.getSignedUrl({
          action: 'read',
          expires: '03-01-2500'
        });

        updates.fileUrl = newFileUrl[0];
      }

      // Handle image update
      if (req.files['image']) {
        const imageFile = req.files['image'][0];
        const oldImageUrl = docSnap.data().imageUrl;
        const bucket = store.bucket();

        if (oldImageUrl) {
          const oldImageName = decodeURIComponent(oldImageUrl.split('/').pop().split('?')[0]);
          const oldImage = bucket.file(`image/${oldImageName}`);
          await oldImage.delete();
        }

        const imageUpload = bucket.file(`image/${imageFile.originalname}`);
        await imageUpload.save(imageFile.buffer, {
          contentType: imageFile.mimetype,
          public: true
        });

        let newImageUrlArray = await imageUpload.getSignedUrl({
          action: 'read',
          expires: '03-01-2500'
        });

        updates.imageUrl = newImageUrlArray[0];
      }

      const { createdAt, ...rest } = req.body;
      if (!createdAt) {
        updates.createdAt = new Date().toISOString();
      }

      const data = {
        id: id,
        fileUrl: updates.fileUrl,
        imageUrl: updates.imageUrl,
        ...rest
      };

      const response = await updateResource(data);
      res.status(response.status).json(response);
    });
  } catch (error) {
    res.status(400).json({ msg: 'Failed to update resource', details: error.message });
  }
};

const handleUpdateResourceRating = async (req, res) => {
  try{
    const id=req.body.id;
    const rating=req.body.userRating;
    const response=await updateResourceRating(id,rating);
    res.status(response.status).json(response);
  } catch (error){
    res.status(400).json({ msg: 'Failed to update resource rating', details: error.message });
  }
}

const handleDeleteResource = async (req, res) => {
  const id = req.params.id;
  try {
    const docRef = Resources.doc(id);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      return res.status(404).json({ msg: 'Resource not found' });
    }

    const oldFileUrl = docSnap.data().fileUrl;
    const oldFileName = decodeURIComponent(oldFileUrl.split('/').pop().split('?')[0]);
    const bucket = store.bucket();
    const oldFile = bucket.file(`document/${oldFileName}`);

    await oldFile.delete();

    const oldImageUrl = docSnap.data().imageUrl;
    if (oldImageUrl) {
      const oldImageName = decodeURIComponent(oldImageUrl.split('/').pop().split('?')[0]);
      const oldImage = bucket.file(`image/${oldImageName}`);
      await oldImage.delete();
    }

    const response = await deleteResource(id); 
    return res.status(response.status).json(response);

  } catch (error) {
    return res.status(400).json({ msg: 'Failed to delete resource', details: error.message });
  }
};

module.exports={handleAddResource, handleGetAllResources,handleGetResourceById,handleUpdateResource,handleUpdateResourceRating,handleDeleteResource};
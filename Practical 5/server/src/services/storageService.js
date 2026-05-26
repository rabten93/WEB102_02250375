const supabase = require('../lib/supabase');
const path = require('path');
const fs = require('fs');

const uploadFile = async (file, bucket) => {
  try {
    const fileExt = path.extname(file.originalname);
    const fileName = `${Date.now()}${fileExt}`;

    const fileBuffer = fs.readFileSync(file.path);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, fileBuffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    fs.unlinkSync(file.path);

    return {
      path: fileName,
      publicUrl: publicUrlData.publicUrl,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  uploadFile,
};
const {Storage} = require('@google-cloud/storage');

const storage = new Storage();
const bucket = 'cs130skullstrip';
exports.generateV4UploadSignedUrl = async function generateV4UploadSignedUrl(expireMinutes,file) {
    // These options will allow temporary uploading of the file with outgoing
    // Content-Type: application/octet-stream header.
    const options = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + expireMinutes * 60 * 1000, // 15 minutes
        contentType: 'application/zip',
    };

    // Get a v4 signed URL for uploading file
    const [url] = await storage
        .bucket(bucket)
        .file(file)
        .getSignedUrl(options);

    return url;
};
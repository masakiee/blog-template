/**
 * AWS Lambda の Node.js v20 ランタイムで実行される Lambda@Edge 関数
 */
exports.handler = async (event, context, callback) => {
    // Extract the request from the CloudFront event that is sent to Lambda@Edge 
    var request = event.Records[0].cf.request;

    // Extract the URI from the request
    var olduri = request.uri;

    // Match any '/' that occurs at the end of a URI. Replace it with a default index
    var lastPart = olduri.split('/').at(-1);
    if (lastPart.includes('')) {
        // Replace the received URI with the URI that includes the index page
        request.uri = olduri.replace(/\/$/, '\/index.html');
    }
    
    // Return to CloudFront
    return callback(null, request);
};

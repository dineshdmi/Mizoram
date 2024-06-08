"use strict"
import multer from 'multer'
import AWS from 'aws-sdk'
import config from 'config'
import { logger, reqInfo } from './winston_logger'
import multerS3 from 'multer-s3'
import { Request, Response } from 'express'
import { apiResponse } from '../common'
import multer_s3_transform from 'multer-s3-transform'
import sharp from 'sharp'
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs'

const aws: any = config.get('aws')
const s3 = new AWS.S3({
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey,
    region: aws.region
})
const bucket_name = aws.bucket_name

export const deleteImage = async function (file: any, folder: any) {
    return new Promise(async function (resolve, reject) {
        try {
            const bucketPath = `${bucket_name}/${folder}`

            let params = {
                Bucket: bucketPath,
                Key: file
            }
            await s3.deleteObject(params, function (err, data) {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    logger.info("File successfully delete")
                    resolve("File successfully delete")
                }
            })
        } catch (error) {
            console.log(error)
            reject(false)
        }
    })
}

export const getS3File = async function (filepath: any,) {
    return new Promise(async function (resolve, reject) {
        try {
            if (filepath == null || filepath == undefined || filepath == "") {
                return resolve(true)
            }
            else {
                let param = {
                    Bucket: bucket_name, // your bucket name,
                    Key: filepath // path to the object you're looking for
                }
                console.log(param);
                s3.getObject(param, function (err, data) {
                    // Handle any error and exit
                    if (err) {
                        // console.log('Object Error ', err);
                        return resolve(false)
                    }
                    return resolve(data)
                });
            }
        } catch (error) {
            console.log(error)
            resolve(false)
        }
    })
}

export const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucket_name,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req: any, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req: any, file, cb) {
            logger.info('file successfully upload')
            const file_type = file.originalname.split('.')
            req.body.location = `${req.header('user')?._id}/${req.params.file}/${Date.now().toString()}.${file_type[file_type.length - 1]}`
            cb(
                null,
                `${req.header('user')?._id}/${req.params.file}/${Date.now().toString()}.${file_type[file_type.length - 1]}`
            );
        },
    }),
});

export const compress_image = multer({
    storage: multer_s3_transform({
        s3: s3,
        bucket: bucket_name,
        acl: 'public-read',
        shouldTransform: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        transforms: [{
            id: 'image_500_300',
            key: function (req, file, cb) {
                const file_type = file.originalname.split('.')
                req.body.location = `${req.header('user')?._id}/${req.params.file}/${Date.now().toString()}.${file_type[file_type.length - 1]}`
                cb(null, `${req.header('user')?._id}/${req.params.file}/${Date.now().toString()}.${file_type[file_type.length - 1]}`)
            },
            transform: function (req, file, cb) {
                logger.info('compress image successfully upload')
                cb(null, sharp().withMetadata().jpeg({ quality: 50 }))
            }
        }]
    })
})

export const compress_image_Without = multer({
    storage: multer_s3_transform({
        s3: s3,
        bucket: bucket_name,
        acl: 'public-read',
        shouldTransform: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        transforms: [{
            id: 'image_500_300',
            key: function (req, file, cb) {
                const file_type = file.originalname.split('.')
                req.body.location = `${req.params.file}/${Date.now().toString()}.${file_type[file_type.length - 1]}`
                cb(null, `${req.params.file}/${Date.now().toString()}.${file_type[file_type.length - 1]}`)
            },
            transform: function (req, file, cb) {
                logger.info('compress image successfully upload')
                cb(null, sharp().withMetadata().jpeg({ quality: 50 }))
            }
        }]
    })
})
export const file_upload_response = async (req: Request, res: Response) => {
    reqInfo(req)
    try {
        let file: any = req.file
        return res.status(200).json({
            status: 200,
            message: "image successfully uploaded",
            // data: { image: file?.location }
            data: { image: req.body.location }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(new apiResponse(500, 'Internal server error in reset-password', {}, error));
    }
}

export const multer_image_compress_response = async (req: Request, res: Response) => {
    reqInfo(req)
    try {
        let file: any = req.file
        const file_type = file.originalname.split('.')
        let new_filename = new Date().getTime()
        if (!existsSync(`${process.cwd()}/upload`)) {
            mkdirSync(`${process.cwd()}/upload`);
        }
        if (!existsSync(`${process.cwd()}/upload/${(req.header('user') as any)?._id}`)) {
            mkdirSync(`${process.cwd()}/upload/${(req.header('user') as any)?._id}`);
        }
        if (!existsSync(`${process.cwd()}/upload/${(req.header('user') as any)?._id}/${req.params.file}`)) {
            mkdirSync(`${process.cwd()}/upload/${(req.header('user') as any)?._id}/${req.params.file}`);
        }
        await sharp(`${process.cwd()}/multer_uploads/${req.file.filename}`)
            .withMetadata()
            .jpeg({ quality: 50 }).toFile(`${process.cwd()}/upload/${(req.header('user') as any)?._id}/${req.params.file}/${new_filename}.${file_type[file_type.length - 1]}`, async (err, info) => {
                if (err) {
                    console.log('Sharp Error ', err)
                    return res.status(400).json({ status: 400, message: "Sharp error", data: {} })
                }
                else {
                    await unlinkSync(`${process.cwd()}/multer_uploads/${req.file.filename}`)
                    return res.status(200).json({
                        status: 200,
                        message: "image successfully uploaded",
                        data: { image: `${(req.header('user') as any)?._id}/${req.params.file}/${new_filename}.${file_type[file_type.length - 1]}` }
                    })
                }
            })


    } catch (error) {
        console.log(error)
        return res.status(500).json(new apiResponse(500, 'Internal Server Error', {}, error));
    }
}

export const multer_image_non_compress_response = async (req: Request, res: Response) => {
    reqInfo(req)
    try {
        let file: any = req.file
        const file_type = file.originalname.split('.')
        let new_filename = new Date().getTime()
        if (!existsSync(`${process.cwd()}/upload`)) {
            mkdirSync(`${process.cwd()}/upload`);
        }
        if (!existsSync(`${process.cwd()}/upload/${(req.header('user') as any)?._id}`)) {
            mkdirSync(`${process.cwd()}/upload/${(req.header('user') as any)?._id}`);
        }
        if (!existsSync(`${process.cwd()}/upload/${(req.header('user') as any)?._id}/${req.params.file}`)) {
            mkdirSync(`${process.cwd()}/upload/${(req.header('user') as any)?._id}/${req.params.file}`);
        }
        let bufferData = await readFileSync(`${process.cwd()}/multer_uploads/${req.file.filename}`)
        await writeFileSync(`${process.cwd()}/upload/${(req.header('user') as any)?._id}/${req.params.file}/${new_filename}.${file_type[file_type.length - 1]}`, bufferData)
        await unlinkSync(`${process.cwd()}/multer_uploads/${req.file.filename}`)
        return res.status(200).json({
            status: 200,
            message: "image successfully uploaded",
            data: { image: `${(req.header('user') as any)?._id}/${req.params.file}/${new_filename}.${file_type[file_type.length - 1]}` }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(new apiResponse(500, 'Internal Server Error', {}, error));
    }
}

export const image_compress_response = async (req: Request, res: Response) => {
    reqInfo(req)
    try {
        let file: any = req.file
        return res.status(200).json({
            status: 200,
            message: "image successfully uploaded",
            // data: { image: file?.transforms[0]?.location }
            data: { image: req.body.location }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(new apiResponse(500, 'Internal Server Error', {}, error));
    }
}

export const delete_file = async (req: Request, res: Response) => {
    reqInfo(req)
    let { file, folder } = req.params
    try {
        let message = await deleteImage(file, folder)
        return res.status(200).json(new apiResponse(200, `${message}`, {}, {}))

    } catch (error) {
        console.log(error)
        return res.status(500).json(new apiResponse(500, 'Internal Server Error ', {}, error));
    }
}

export const upload_all_type = async function (image, bucketPath) {
    return new Promise(async function (resolve, reject) {
        try {
            // image.data = await compressImage(image)
            var params = {
                Bucket: `${bucket_name}/${bucketPath}`,
                Key: image.name,
                Body: image.data,
                ContentType: image.mimetype,
                ACL: "public-read"
            };
            logger.debug("Uploading S3")
            s3.upload(params, function (err, data) {
                if (err) {
                    console.log(err);
                    reject()
                } else {
                    logger.debug("Successfully uploaded data ");
                    resolve(data.Location)
                }
            });
        } catch (error) {
            console.log(error);
            reject()
        }
    })
}
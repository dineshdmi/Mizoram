"use strict"
import * as Joi from "joi"
import { apiResponse } from '../common'
import { isValidObjectId } from 'mongoose'
import { Request, Response } from 'express'

export const add = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        subjectId: Joi.string().required().error(new Error('subjectId is required!')),
        question: Joi.string().required().error(new Error('question is required!')),
        answer: Joi.string().required().error(new Error('answer is required!')),
        option: Joi.array().required().error(new Error('option is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => { res.status(400).json(new apiResponse(400, error.message, {}, {})) })
}

export const get_by_title = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        question: Joi.string().required().error(new Error('question is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => { res.status(400).json(new apiResponse(400, error.message, {}, {})) })
}

export const by_id = async (req: Request, res: Response, next: any) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).json(new apiResponse(400, 'invalid id', {}, {}))
    return next()
}

export const update = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        id: Joi.string().required().error(new Error('id is required!')),
        subjectId: Joi.string().error(new Error('subjectId is string!')),
        answer: Joi.string().error(new Error('answer is string!')),
        question: Joi.string().error(new Error('question is string!')),
        option: Joi.array().error(new Error('option is array!')),
    })
    schema.validateAsync(req.body).then(result => {
        if (!isValidObjectId(result.id)) return res.status(400).json(new apiResponse(400, "Invalid id format", {}, {}));
        return next()
    }).catch(error => { res.status(400).json(new apiResponse(400, error.message, {}, {})) })
}
"use strict"
import { reqInfo } from '../../helpers/winston_logger'
import { schedule_time_slotModel, userModel, user_batchModel } from '../../database'
import { apiResponse } from '../../common'
import { Request, Response } from 'express'
import { faculty_assign_mail } from '../../helpers/mail'
import { assign_faculty_Model } from '../../database/models/assign_faculty'

const ObjectId = require('mongoose').Types.ObjectId

// export const add_assign_faculty = async (req: Request, res: Response) => {
//     reqInfo(req)
//     let body = req.body, email_data: any=[]
//     req.body.createdBy = (req.header('user') as any)?._id
//     try {
//         let existFaculty = await assign_faculty_Model.findOne({ facultyId: ObjectId(body.facultyId), time_slotId: body.time_slotId, isActive: true })
//         if (existFaculty) return res.status(409).json(new apiResponse(409, 'Faculty Already Assign', {}, {}))
//         let response = await new assign_faculty_Model(body).save()
//         if (response) {
//             let schedule_time_data = await schedule_time_slotModel.aggregate([
//                 { $match: { time_slotId: ObjectId(req.body?.time_slotId), date: new Date(req.body?.date), isActive: true, subjectId:ObjectId(body?.subjectId) } },
//                 {
//                     $lookup: {
//                         from: "users",
//                         let: { createdBy: '$createdBy' },
//                         pipeline: [
//                             {
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ['$_id', '$$createdBy'] },
//                                             { $eq: ['$isActive', true] },
//                                         ],
//                                     },
//                                 }
//                             }
//                         ],
//                         as: "user"
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: "course_subjects",
//                         let: { subjectId: '$subjectId' },
//                         pipeline: [
//                             {
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ['$_id', '$$subjectId'] },
//                                             { $eq: ['$isActive', true] },
//                                         ],
//                                     },
//                                 }
//                             }
//                         ],
//                         as: "Course"
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: "time_slots",
//                         let: { time_slotId: '$time_slotId' },
//                         pipeline: [
//                             {
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ['$_id', '$$time_slotId'] },
//                                             { $eq: ['$isActive', true] },
//                                         ],
//                                     },
//                                 }
//                             }
//                         ],
//                         as: "slot"
//                     }
//                 },
//                 { $unwind: { path: "$user" } },
//                 {
//                     $group: {
//                         _id: "",
//                         user_email: { $addToSet: "$user.email"},
//                         course:{$first:"$Course.title"},
//                         time:{$first:"$slot.start_time"},
//                         end:{$first:"$slot.end_time"},
//                     }
//                 }
//             ])
//             console.log(schedule_time_data);
//             if(body?.isStudent) email_data = schedule_time_data[0]?.user_email || []
//             console.log(email_data)
//             if(body?.isFaculty) {
//                 let faculty_data: any = await userModel.findOne({ _id: ObjectId(req.body?.facultyId), isActive: true })
//                 email_data.push(faculty_data?.email)
//              }
//             console.log(email_data)
//             await faculty_assign_mail(email_data,schedule_time_data[0],body?.date,body?.meeting_link)
//             return res.status(200).json(new apiResponse(200, 'Assign Faculty Successfully', response, {}))
//         }
//         else return res.status(400).json(new apiResponse(400, 'database error while adding', {}, {}))
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(new apiResponse(500, 'Internal server error', {}, {}))
//     }
// }

// export const add_assign_faculty = async (req: Request, res: Response) => {
//     reqInfo(req)
//     let body = req.body, email_data: any = []
//     req.body.createdBy = (req.header('user') as any)?._id
//     try {
//         let existFaculty = await assign_faculty_Model.findOne({ facultyId: ObjectId(body.facultyId), time_slotId: body.time_slotId, isActive: true, date: body.date, subjectId: ObjectId(body.subjectId) })
//         if (existFaculty) return res.status(409).json(new apiResponse(409, 'Faculty already assign', {}, {}))
//         let response = await new assign_faculty_Model(body).save()
//         if (response) {
//             let schedule_time_data = await schedule_time_slotModel.aggregate([
//                 { $match: { time_slotId: ObjectId(req.body?.time_slotId), date: new Date(req.body?.date), isActive: true, subjectId: ObjectId(body?.subjectId) } },
//                 {
//                     $lookup: {
//                         from: "users",
//                         let: { createdBy: '$createdBy' },
//                         pipeline: [
//                             {
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ['$_id', '$$createdBy'] },
//                                             { $eq: ['$isActive', true] },
//                                         ],
//                                     },
//                                 }
//                             }
//                         ],
//                         as: "user"
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: "course_subjects",
//                         let: { subjectId: '$subjectId' },
//                         pipeline: [
//                             {
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ['$_id', '$$subjectId'] },
//                                             { $eq: ['$isActive', true] },
//                                         ],
//                                     },
//                                 }
//                             }
//                         ],
//                         as: "Course"
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: "time_slots",
//                         let: { time_slotId: '$time_slotId' },
//                         pipeline: [
//                             {
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ['$_id', '$$time_slotId'] },
//                                             { $eq: ['$isActive', true] },
//                                         ],
//                                     },
//                                 }
//                             }
//                         ],
//                         as: "slot"
//                     }
//                 },
//                 { $unwind: { path: "$user" } },
//                 {
//                     $group: {
//                         _id: "",
//                         user_email: { $addToSet: "$user.email" },
//                         course: { $first: "$Course.title" },
//                         time: { $first: "$slot.start_time" },
//                         end: { $first: "$slot.end_time" },
//                     }
//                 }
//             ])
//             console.log(schedule_time_data);
//             if (body?.isStudent) email_data = schedule_time_data[0]?.user_email || []
//             console.log(email_data)
//             if (body?.isFaculty) {
//                 let faculty_data: any = await userModel.findOne({ _id: ObjectId(req.body?.facultyId), isActive: true })
//                 email_data.push(faculty_data?.email)
//             }
//             console.log(email_data)
//             await faculty_assign_mail(email_data, schedule_time_data[0], body?.date, body?.meeting_link)
//             return res.status(200).json(new apiResponse(200, 'Assign faculty successfully', response, {}))
//         }
//         else return res.status(400).json(new apiResponse(400, 'Database error while adding faculty', {}, {}))
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(new apiResponse(500, 'Internal server error', {}, {}))
//     }
// }

export const add_assign_faculty = async (req: Request, res: Response) => {
    reqInfo(req)
    let body = req.body, email_data: any = []
    req.body.createdBy = (req.header('user') as any)?._id
    try {
        let existFaculty = await assign_faculty_Model.findOne({ facultyId: ObjectId(body.facultyId), time_slotId: body.time_slotId, isActive: true, date: body.date, subjectId: ObjectId(body.subjectId) })
        if (existFaculty) return res.status(409).json(new apiResponse(409, 'Faculty already assign', {}, {}))
        // let response = await new assign_faculty_Model(body).save()
        // if (response) {
        let schedule_time_data = await user_batchModel.aggregate([
            { $match: { _id: ObjectId(body?.batchId), time_slotId: ObjectId(body?.time_slotId), date: new Date(body?.date), isActive: true, subjectId: ObjectId(body?.subjectId) } },
            {
                $lookup: {
                    from: "users",
                    let: { createdBy: '$selectedUser' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $in: ['$_id', '$$createdBy'] },
                                        { $eq: ['$isActive', true] },
                                    ],
                                },
                            }
                        },

                    ],
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "course_subjects",
                    let: { subjectId: '$subjectId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$subjectId'] },
                                        { $eq: ['$isActive', true] },
                                    ],
                                },
                            }
                        }
                    ],
                    as: "Course"
                }
            },
            {
                $lookup: {
                    from: "time_slots",
                    let: { time_slotId: '$time_slotId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$time_slotId'] },
                                        { $eq: ['$isActive', true] },
                                    ],
                                },
                            }
                        }
                    ],
                    as: "slot"
                }
            },
            { $unwind: { path: "$user" } },
            {
                $group: {
                    _id: "",
                    user_email: { $addToSet: "$user.email" },
                    course: { $first: "$Course.title" },
                    start_time: { $first: "$slot.start_time" },
                    end_time: { $first: "$slot.end_time" },
                }
            }
        ]);

        if (schedule_time_data.length != 0) {
            let response = await new assign_faculty_Model(body).save()
            if (body?.isStudent) email_data = schedule_time_data[0]?.user_email || []
            if (body?.isFaculty) {
                let faculty_data: any = await userModel.findOne({ _id: ObjectId(req.body?.facultyId), isActive: true })
                email_data.push(faculty_data?.email)
            }
            let dateIs = body?.date.split("T");

            await faculty_assign_mail(email_data, schedule_time_data[0], dateIs[0], body?.meeting_link)
            return res.status(200).json(new apiResponse(200, 'Assign faculty successfully', response, {}))
        } else {
            return res.status(400).json(new apiResponse(400, 'Database error while adding faculty', {}, {}))
        }

        // }
        // else return res.status(400).json(new apiResponse(400, 'Database error while adding faculty', {}, {}))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, 'Internal server error', {}, {}))
    }
}

export const get_by_assign_faculty = async (req: Request, res: Response) => {
    reqInfo(req)
    let body = req.body

    try {
        let response = await assign_faculty_Model.aggregate([
            { $match: { _id: ObjectId(req.params.id), isActive: true } },
            {
                $lookup: {
                    from: "users",
                    let: { facultyId: '$facultyId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$facultyId'] },
                                        { $eq: ['$isActive', true] },
                                        // { $eq: ['$isEnable', true] },
                                    ],
                                },
                            }
                        }
                    ],
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "time_slots",
                    let: { time_slotId: '$time_slotId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$time_slotId'] },
                                        { $eq: ['$isActive', true] },
                                    ],
                                },
                            }
                        }
                    ],
                    as: "slot"
                }
            },
            {
                $project: {
                    _id: 1, date: 1, meeting_link: 1, facultyId: 1, time_slotId: 1, subjectId: 1,
                    isFaculty: 1, isStudent: 1, faculty: { $first: "$user.name" },
                    // "user.name": 1,
                    "slot.start_time": 1, "slot.end_time": 1
                }
            }
        ])
        if (response) return res.status(200).json(new apiResponse(200, 'Get assigned faculty successfully', response, {}))
        else return res.status(400).json(new apiResponse(400, 'Database error while getting assigned faculty', {}, {}))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, 'Internal server error', {}, {}))
    }
}

export const update_assign_faculty = async (req: Request, res: Response) => {
    reqInfo(req)
    let body = req.body, email_data: any = []
    req.body.updatedBy = (req.header('user') as any)?._id

    try {
        let response = await assign_faculty_Model.findOneAndUpdate({ _id: ObjectId(body.id), isActive: true }, body)
        if (response) {
            let schedule_time_data = await schedule_time_slotModel.aggregate([
                { $match: { time_slotId: ObjectId(req.body?.time_slotId), date: new Date(req.body?.date), isActive: true, subjectId: ObjectId(body?.subjectId) } },
                {
                    $lookup: {
                        from: "users",
                        let: { createdBy: '$createdBy' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$_id', '$$createdBy'] },
                                            { $eq: ['$isActive', true] },
                                        ],
                                    },
                                }
                            }
                        ],
                        as: "user"
                    }
                },
                { $unwind: { path: "$user" } },
                {
                    $group: {
                        _id: "",
                        user_email: { $addToSet: "$user.email" }
                    }
                }
            ])
            console.log(body.meeting_link);
            let data = body.meeting_link
            if (body?.isStudent) email_data = schedule_time_data[0]?.user_email || []
            console.log(email_data)
            if (body?.isFaculty) {
                let faculty_data: any = await userModel.findOne({ _id: ObjectId(req.body?.facultyId), isActive: true })
                email_data.push(data)
                email_data.push(faculty_data?.email)
            }
            console.log(email_data)
            await faculty_assign_mail(email_data, schedule_time_data[0], body?.date, body?.meeting_link)
            return res.status(200).json(new apiResponse(200, 'Assigned faculty successfully updated', response, {}))
        }
        // return res.status(200).json(new apiResponse(200, 'Assign Faculty updated', response, {}))
        else return res.status(400).json(new apiResponse(400, 'Database error while updating assigned faculty', {}, {}))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, 'Internal server error', {}, {}))
    }
}

export const delete_assign_faculty = async (req: Request, res: Response) => {
    reqInfo(req)
    let body = req.body
    req.body.updatedBy = (req.header('user') as any)?._id

    try {
        let response = await assign_faculty_Model.findOneAndUpdate({ _id: ObjectId(req.params.id), isActive: true }, { isActive: false })
        if (response) return res.status(200).json(new apiResponse(200, 'Assigned faculty successfully deleted', response, {}))
        else return res.status(400).json(new apiResponse(400, 'Database error while deleting assigned faculty', {}, {}))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, 'Internal server error', {}, {}))
    }
}

export const get_assign_faculty = async (req: Request, res: Response) => {
    reqInfo(req)
    try {

        let response = await user_batchModel.aggregate([
            { $match: { isActive: true } },
            {
                $lookup: {
                    from: "users",
                    let: { createdBy: '$selectedUser' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $in: ['$_id', '$$createdBy'] },
                                        { $eq: ['$isActive', true] },
                                    ],
                                },
                            }
                        },

                    ],
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "time_slots",
                    let: { time_slotId: '$time_slotId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$time_slotId'] },
                                        { $eq: ['$isActive', true] },
                                    ],
                                },
                            }
                        },
                        { $project: { start_time: 1, end_time: 1 } }
                    ],
                    as: "time_slot"
                }
            },
            {
                $lookup: {
                    from: "course_subjects",
                    let: { subjectId: '$subjectId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$subjectId'] },
                                        { $eq: ['$isActive', true] },
                                    ],
                                },
                            }
                        },
                        { $project: { title: 1, _id: 1 } }
                    ],
                    as: "course"
                }
            },
            {
                $lookup: {
                    from: "assign_faculties",
                    let: { subjectId: '$subjectId', time_slotId: '$time_slotId', date: '$date', batchId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$batchId', '$$batchId'] },
                                        { $eq: ['$subjectId', '$$subjectId'] },
                                        { $eq: ['$isActive', true] },
                                        { $eq: ['$date', '$$date'] },
                                        { $eq: ['$time_slotId', '$$time_slotId'] },
                                    ],
                                },
                            }
                        },
                        {
                            $lookup: {
                                from: "users",
                                let: { facultyId: '$facultyId' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ['$_id', '$$facultyId'] },
                                                    { $eq: ['$isActive', true] },
                                                ],
                                            },
                                        }
                                    },
                                    { $project: { name: 1 } }
                                ],
                                as: "user"
                            }
                        },
                        { $unwind: { path: "$user" } }
                    ],
                    as: "faculty"
                }
            },
            {
                $project: {
                    time_slotId: 1,
                    subjectId: 1,
                    selectedUser: 1,
                    date: 1,
                    course: { $first: "$course.title" },
                    start_time: { $first: "$time_slot.start_time" },
                    end_time: { $first: "$time_slot.end_time" },
                    faculty: { $first: "$faculty.user.name" },
                    userCount: { $size: "$user" },
                    userData: "$user",
                }
            },
            { $sort: { updatedAt: -1 } },
        ])
        if (response) return res.status(200).json(new apiResponse(200, 'Details', response, {}))
        else return res.status(400).json(new apiResponse(400, 'Database error', {}, {}))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, 'Internal server error', {}, {}))
    }
}

// export const get_assign_faculty = async (req: Request, res: Response) => {
//     reqInfo(req)
//     try {

//         let response = await schedule_time_slotModel.aggregate([
//             { $match: { isActive: true } },
//             {
//                 $lookup: {
//                     from: "users",
//                     let: { createdBy: '$createdBy' },
//                     pipeline: [
//                         {
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ['$_id', '$$createdBy'] },
//                                         { $eq: ['$isActive', true] },
//                                     ],
//                                 },
//                             }
//                         },

//                     ],
//                     as: "user"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "time_slots",
//                     let: { time_slotId: '$time_slotId' },
//                     pipeline: [
//                         {
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ['$_id', '$$time_slotId'] },
//                                         { $eq: ['$isActive', true] },
//                                     ],
//                                 },
//                             }
//                         },
//                         { $project: { start_time: 1, end_time: 1 } }
//                     ],
//                     as: "time_slot"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "course_subjects",
//                     let: { subjectId: '$subjectId' },
//                     pipeline: [
//                         {
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ['$_id', '$$subjectId'] },
//                                         { $eq: ['$isActive', true] },
//                                     ],
//                                 },
//                             }
//                         },
//                     ],
//                     as: "course"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "assign_faculties",
//                     let: { subjectId: '$subjectId', time_slotId: '$time_slotId', date: '$date' },
//                     pipeline: [
//                         {
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ['$subjectId', '$$subjectId'] },
//                                         { $eq: ['$isActive', true] },
//                                         { $eq: ['$date', '$$date'] },
//                                         { $eq: ['$time_slotId', '$$time_slotId'] },
//                                     ],
//                                 },
//                             }
//                         },
//                         {
//                             $lookup: {
//                                 from: "users",
//                                 let: { facultyId: '$facultyId' },
//                                 pipeline: [
//                                     {
//                                         $match: {
//                                             $expr: {
//                                                 $and: [
//                                                     { $eq: ['$_id', '$$facultyId'] },
//                                                     { $eq: ['$isActive', true] },
//                                                 ],
//                                             },
//                                         }
//                                     },
//                                     { $project: { name: 1 } }
//                                 ],
//                                 as: "user"
//                             }
//                         },
//                         { $unwind: { path: "$user" } }
//                     ],
//                     as: "faculty"
//                 }
//             },
//             {
//                 $group: {
//                     _id: {
//                         date: "$date",
//                         course: { $first: "$course.title" },
//                         start_time: { $first: "$time_slot.start_time" },
//                         end_time: { $first: "$time_slot.end_time" },
//                     },
//                     id: { $first: "$_id" },
//                     date: { $first: "$date" },
//                     course: { $first: { $first: "$course.title" } },
//                     courseId: { $first: { $first: "$course._id" } },
//                     slotId: { $first: { $first: "$time_slot._id" } },
//                     start_time: { $first: { $first: "$time_slot.start_time" } },
//                     end_time: { $first: { $first: "$time_slot.end_time" } },
//                     faculty: { $first: { $first: "$faculty.user.name" } },
//                     totalStudent: { "$sum": 1 },
//                     userData: { $push: { $first: "$user" } }
//                 }
//             },
//             { $sort: { date: -1 } },
//         ])
//         if (response) return res.status(200).json(new apiResponse(200, 'Details', response, {}))
//         else return res.status(400).json(new apiResponse(400, 'Database error', {}, {}))
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(new apiResponse(500, 'Internal server error', {}, {}))
//     }
// }
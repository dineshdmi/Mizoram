import { Router } from 'express'
import { userJWT } from '../helpers/jwt'
import { adminController, authenticationController, auditorController, studentController } from '../controllers'
import {
    userValidation, schoolValidation, teacherValidation, main_categoryValidation, categoryValidation, time_slotValidation,
    sub_categoryValidation, genreValidation, bookValidation, theory_questionValidation, testValidation, questionValidation, discountValidation,
    assign_facultyValidation, course_subjectValidation, contentValidation, training_typeValidation
} from '../validation'

const router = Router()

router.post('/login', userValidation.login, authenticationController.login)
router.post('/otp_verification', userValidation.otp_verification, authenticationController.otp_verification)
router.post('/reset_password', userValidation.reset_password, authenticationController.reset_password)
router.post('/resend_otp', userValidation.resend_otp, authenticationController.resend_otp)
router.post('/forgot_password', userValidation.forgot_password, authenticationController.forgot_password)

//  ------   Authentication ------  
router.use(userJWT)

router.post('/logout', authenticationController.logout)

router.get('/', auditorController.get_profile)
router.put('/update', userValidation.update_profile, authenticationController.update_profile)
router.post('/change_password', userValidation.change_password, authenticationController.change_password)

//  ------  Dashboard Routes  ------
router.get('/home', adminController.dashboard)

//  -----   School Routes   --------
router.get('/school', adminController.get_school)
router.post('/school/get_school', adminController.get_filter_school)
router.post('/school/add', schoolValidation.add, adminController.add_school)
router.put('/school/update', schoolValidation.update, adminController.update_school)
router.get('/school/:id', schoolValidation.by_id, adminController.get_by_id_school)
router.delete('/school/delete/:id', schoolValidation.by_id, adminController.delete_school)

//  -----   teacher Routes   --------
router.get('/teacher', adminController.get_teacher)
router.post('/teacher/get_teacher', adminController.get_filter_data)
router.post('/teacher/add', teacherValidation.add, adminController.add_teacher)
router.put('/teacher/update', teacherValidation.update, adminController.update_teacher)
router.get('/teacher/:id', teacherValidation.by_id, adminController.by_id_teacher)
router.delete('/teacher/delete/:id', teacherValidation.by_id, adminController.delete_teacher)

//  -----   Faculty Routes   --------
router.get('/faculty', adminController.get_faculty)
router.post('/faculty/add', teacherValidation.add, adminController.add_faculty)
router.put('/faculty/update', teacherValidation.update, adminController.update_faculty)
router.post('/faculty/get_faculty', adminController.get_filter_faculty)
router.get('/faculty/:id', teacherValidation.by_id, adminController.by_id_faculty)
router.delete('/faculty/delete/:id', teacherValidation.by_id, adminController.delete_faculty)

//  ------   Main Category Routes  ------  
router.get('/main_category', adminController.get_main_category)
router.post('/main_category/get_main_category', adminController.get_filter_main_category)
router.post('/main_category/add', main_categoryValidation.add, adminController.add_main_category)
router.put('/main_category/update', main_categoryValidation.update, adminController.update_main_category)
router.get('/main_category/:id', main_categoryValidation.by_id, adminController.get_by_id)
router.delete('/main_category/delete/:id', main_categoryValidation.by_id, adminController.delete_main_category)

//  ------   Category Routes  ------
router.get('/category', adminController.get_all_category)
router.post('/category/add', categoryValidation.add, adminController.add_category)
router.post('/category/get_category', adminController.get_filter_category)
router.put('/category/update', categoryValidation.update, adminController.update_category)
router.get('/category/:id', categoryValidation.by_id, adminController.get_category)
router.delete('/category/delete/:id', categoryValidation.by_id, adminController.delete_category)

//  ------   sub Category Routes  ------
router.get('/sub_category', adminController.get_sub_category)
router.post('/sub_category/get_sub_category', adminController.get_filter_sub_category)
router.post('/sub_category/add', sub_categoryValidation.add, adminController.add_sub_category)
router.put('/sub_category/update', sub_categoryValidation.update, adminController.update_sub_category)
router.get('/sub_category/:id', sub_categoryValidation.by_id, adminController.by_id_sub_category)
router.delete('/sub_category/delete/:id', sub_categoryValidation.by_id, adminController.delete_sub_category)

//  ------   Genre Routes  ------
router.get('/genre', adminController.get_genre)
router.post('/genre/get_genre', adminController.get_filter_genre)
router.post('/genre/add', genreValidation.add, adminController.add_genre)
router.put('/genre/update', genreValidation.update, adminController.update_genre)
router.get('/genre/:id', genreValidation.by_id, adminController.get_by_id_genre)
router.delete('/genre/delete/:id', genreValidation.by_id, adminController.delete_genre)

//  ------   Book Routes  ------
router.get('/book', adminController.get_book)
router.post('/book/get_book', adminController.get_filter_book)
router.post('/book/get_book_admin', auditorController.get_filter_book_admin)
router.post('/book/add', bookValidation.add, auditorController.add_book)
router.put('/book/update', bookValidation.update, adminController.update_book)
router.get('/book/:id', bookValidation.by_id, adminController.by_id_book)
router.get('/:id-:isEnable', bookValidation.enable, adminController.enable)
router.delete('/book/delete/:id', bookValidation.by_id, adminController.delete_book)

//  ------   Order Routes  ------
router.get('/orders', adminController.get_orders)

//  ------   Download Routes  ------
router.get('/download/history', adminController.download_history)

//  ------   Student Routes  ------
router.get('/student', adminController.get_student)
router.post('/student/result', adminController.get_student_status)
router.post('/student/get_student', adminController.get_filter_student)
router.get('/student/:id', userValidation.by_id, adminController.get_by_student)


//  ------   Test Routes  ------
router.get('/test', adminController.get_test)
router.get('/test/mcq', adminController.get_mcq)
router.get('/test/theory', adminController.get_theory)
router.post('/test/add', testValidation.add, adminController.add_test)
router.put('/test/update', testValidation.update, adminController.update_test)
router.get('/test/:id', testValidation.by_id, adminController.get_test_by_id)
router.delete('/test/delete/:id', testValidation.by_id, adminController.delete_test)

//  ------   Theory Question Routes  ------
router.get('/theory_question', adminController.get_theory_question)
router.post('/theory_question/add', theory_questionValidation.add, adminController.add_theory_question)
router.put('/theory_question/update', theory_questionValidation.update, adminController.update_theory_question)
router.post('/theory_question/get_theory_question', adminController.get_filter_theory_question)
router.get('/theory_question/answer/:id', theory_questionValidation.by_id, studentController.get_theory_ans)
router.get('/theory_question/:id', theory_questionValidation.by_id, adminController.byId_theory_question)
router.delete('/theory_question/delete/:id', theory_questionValidation.by_id, adminController.delete_theory_question)

//  ------   MCQ Question Routes  ------
router.get('/question', adminController.get_question)
router.get('/question/title', questionValidation.get_by_title, adminController.get_by_title)
router.post('/question/add', questionValidation.add, adminController.add_question)
router.put('/question/update', questionValidation.update, adminController.update_question)
router.post('/question/get_question', adminController.get_filter_question_bank)
router.get('/question/:id', questionValidation.by_id, adminController.get_by_id_mcq)
router.get('/question/mcq/:id', questionValidation.by_id, adminController.get_mcq_id)
router.delete('/question/delete/:id', questionValidation.by_id, adminController.delete_mcq_question)

// //  ------   Computer Test Routes  ------
// router.get('/computer_test', adminController.get_computerTest)
// router.post('/computer_test/add', computer_testValidation.add, adminController.add_computerTest)
// router.put('/computer_test/update', questionValidation.update, adminController.update_computerTest)
// router.post('/computer_test/get_question', adminController.get_filter_computer_test)
// router.get('/computer_test/:id', questionValidation.by_id, adminController.get_by_id_computer)
// router.delete('/computer_test/delete/:id', questionValidation.by_id, adminController.delete_computer_test)


//  ------   discount Routes  ------
router.get('/discount', adminController.get_discount)
router.post('/discount/add', discountValidation.add, adminController.add_discount)
router.put('/discount/update', discountValidation.update, adminController.update_discount)
router.get('/discount/:id', discountValidation.by_id, adminController.by_id_discount)
router.delete('/discount/delete/:id', discountValidation.by_id, adminController.delete_discount)

//  ------   result Routes  ------
router.get('/student/get_result', adminController.get_result)

//  ------   Slot Routes  ------
router.get('/time_slot', adminController.get_slot)
router.post('/time_slot/add', time_slotValidation.add, adminController.add_slot)
router.put('/time_slot/update', time_slotValidation.update, adminController.update_slot)
router.get('/time_slot/:id', time_slotValidation.by_id, adminController.get_by_id_slot)
router.delete('/time_slot/delete/:id', time_slotValidation.by_id, adminController.delete_slot)

//  ------   Assign Faculty Routes  ------
router.get('/assign_faculty', adminController.get_assign_faculty)
router.post('/assign_faculty/add', assign_facultyValidation.add, adminController.add_assign_faculty)
router.put('/assign_faculty/update', assign_facultyValidation.update, adminController.update_assign_faculty)
router.get('/assign_faculty/:id', assign_facultyValidation.by_id, adminController.get_by_assign_faculty)
router.delete('/assign_faculty/delete/:id', assign_facultyValidation.by_id, adminController.delete_assign_faculty)

//  ------   Subject Routes  ------
router.get('/course_subject', adminController.get_subject)
router.post('/course_subject/add', course_subjectValidation.add, adminController.add_subject)
router.put('/course_subject/update', course_subjectValidation.update, adminController.update_subject)
router.get('/course_subject/:id', course_subjectValidation.by_id, adminController.get_subject_by_id)
router.get('/course_subject/content/:id', course_subjectValidation.by_id, adminController.get_content_by_subject_id)
router.delete('/course_subject/delete/:id', course_subjectValidation.by_id, adminController.delete_subject)

//  ------   Content Routes  ------
router.get('/content', adminController.get_content)
router.get('/content/get', adminController.get_content_subject)
router.post('/content/add', contentValidation.add_content_title, adminController.add_content)
router.post('/content/get_content', adminController.get_filter_content)
router.put('/content/update', contentValidation.update, adminController.update_content)
router.get('/content/:id', contentValidation.by_id, adminController.get_by_content)
router.delete('/content/delete/:id', contentValidation.by_id, adminController.delete_content)

//  ------   Training type Routes  ------
router.get('/training_type', adminController.get_training_type)
router.post('/training_type/add', training_typeValidation.add, adminController.add_training_type)
router.put('/training_type/update', training_typeValidation.update, adminController.update_training_type)
router.get('/training_type/:id', training_typeValidation.by_id, adminController.get_by_training_type)
router.delete('/training_type/delete/:id', training_typeValidation.by_id, adminController.delete_training_type)

//  ------   Book Routes  ------
router.post('/book/add', bookValidation.add, adminController.add_book)
router.get('/book', adminController.get_book)
router.post('/book/get_book', adminController.get_filter_book)
router.post('/book/get_book_admin', adminController.get_filter_book_admin)
router.put('/book/update', bookValidation.update, adminController.update_book)
router.get('/book/:id', bookValidation.by_id, adminController.by_id_book)
router.get('/:id-:isEnable', bookValidation.enable, adminController.enable)
router.delete('/book/delete/:id', bookValidation.by_id, adminController.delete_book)

export const auditorRouter = router
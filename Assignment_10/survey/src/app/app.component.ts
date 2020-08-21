import { EnrollmentService } from './enrollment.service';


import questions from './../assets/questions.json';

import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form:any;
  survey = questions;
//   survey = [
//     {
//         topicId: "1001",
//         topicName: "Early Childhood Care & Education (ECCE)",
//         data: [
//             {
//                 ref: "1.3",
//                 desc: "A National Curricular and Pedagogical Framework for Early Childhood Care and Education (NCPFECCE)",
//                 questions: [
//                   {
//                       question: "Present status in KA",
//                       options: [
//                           "Satisfactory",
//                           "Needs revamp",
//                           "New program to be impl"
//                       ],
//                       textAnswer: "User Text answer",
//                       allowTextAnswer: false
//                   },
//                   {
//                       question: "Nature of Implications",
//                       options: [
//                           "Administrative",
//                           "Pedagogical",
//                           "Other"
//                       ],
//                       textAnswer: "User Text answer",
//                       allowTextAnswer: true
//                   },
//                   {
//                       question: "Implementation Timeline",
//                       options: [
//                           "Short term",
//                           "Long term"
//                       ],
//                       textAnswer: "user text Answer",
//                       allowTextAnswer: true
//                   }
//               ]
//     }
//     ]
//   }
// ]

  constructor(private enrollmentservice: EnrollmentService) { }

  onSubmit(userForm) {

    this.form = userForm.value;
    console.log(this.form);
    this.enrollmentservice.enroll(this.form)
    .subscribe(
      data => console.log('Sucess!', data),
      error => console.log('Error!', error)
    )
  }

  title = 'survey'
}

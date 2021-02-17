import { ZanuttaService } from './../../common/services/zanutta.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-documnet-view',
  templateUrl: './documnet-view.component.html',
  styleUrls: ['./documnet-view.component.css']
})
export class DocumnetViewComponent implements OnInit {
  docForm: FormGroup;
  constructor(private fb: FormBuilder, private zservice: ZanuttaService) {
    this.createFormGroup();
  }

  ngOnInit() {

  }
  createFormGroup() {
    this.docForm = this.fb.group({
    oneFile: ['', [Validators.required]],
    // manyFiles: ['']
    });
  }
  uploadFile(event) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      // if ( !this.docForm.controls.oneFile.value.some(e => e.name === element.name)) {
      // if (!this.docForm.controls.oneFile) {

        //   this.docForm.get('oneFile').setValue(file);
        // }
      this.docForm.patchValue({
            oneFile: element as File,
          });
        }
        // this.singlefile.push(element as File);
        // if (this.singlefile.length > 1) {
        //   this.singlefile.splice(this.singlefile.length - 2, 1);
        // }
      // }
  }
  deleteAttachment(index) {
    // this.singlefile.splice(index, 1);
    this.docForm.patchValue({
      oneFile: '',
    });
  }
  deleteAttachments(index) {
    // this.files.splice(index, 1);
  }
  onSubmit() {
    console.log(this.docForm.value);
    this.addDocument(this.docForm.value);
    // TODO: Use EventEmitter with form value
    // console.log(this.documentForm.value);
    // alert(JSON.stringify(this.documentForm.value));
  }
  addDocument(document: Document) {
    this.zservice.addFile(1, 1, 1, this.docForm.controls.oneFile.value)
      .subscribe(docFile => {
        if (docFile.master === 1) { // if new file is master then add it to docFile array else to docFiles!
          // this.docFile = docFile;
        //  {
        //     this.docFile.splice(this.docFile.length - 2, 1); // if docFile has more than one file delete the first one
        //   }
        } else {
          // this.docFiles.push(docFile);
        }
      });
  }
}

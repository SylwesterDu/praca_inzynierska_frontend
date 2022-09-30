import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
})
export class UploadPageComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  selectedType: string = '';
  isTypeSelected: boolean = false;
  genres: Map<string, string[]> = new Map<string, string[]>();
  tags: string[] = [];

  @ViewChild('fruitInput') tagInput?: ElementRef<HTMLInputElement>;

  titleAndDescriptionFormGroup: FormGroup = this.formBuilder.group({
    title: '',
    description: '',
  });

  typeAndCategoryFormGroup: FormGroup = this.formBuilder.group({
    type: 1,
    category: '',
  });

  tagsFormGroup: FormGroup = this.formBuilder.group({
    tags: [],
  });

  fileFormGroup: FormGroup = this.formBuilder.group({ file: '' });

  tagsFormControl: FormControl = new FormControl('');
  constructor(private formBuilder: FormBuilder) {}

  showCategorySelect(): void {
    this.isTypeSelected = true;
  }

  ngOnInit(): void {
    this.genres.set('music', [
      'Pop',
      'Rap',
      'Rock/metal',
      'Instrumentalna',
      'Techno',
      'Jazz',
      'Reggae',
      'Folk',
      'Inny',
    ]);

    this.genres.set('literature', [
      'Wiersz',
      'Powieść',
      'Komiks',
      'Teksty piosenek',
      'Inne',
    ]);

    this.genres.set('photography', [
      'Fotografia cyfrowa',
      'Grafika komputerowa',
      'Malarstwo',
      'Inne',
    ]);

    this.genres.set('other', [
      'Modelarstwo',
      'Żeźbiarstwo',
      'Wzory drukarek 3D',
      'Origami',
      'Inne',
    ]);
  }

  remove(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();
    value = value.split('#').join('');
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();

    this.tagsFormControl.setValue(null);
    console.log(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput!.nativeElement.value = '';
  }
}

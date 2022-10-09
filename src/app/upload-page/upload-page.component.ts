import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatChip,
  MatChipInputEvent,
  MatChipSelectionChange,
} from '@angular/material/chips';
import { Router } from '@angular/router';

import {
  PublishArtworkRequest,
  UploadProcess,
  UploadService,
} from '../services/upload.service';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
})
export class UploadPageComponent implements OnInit {
  uploadProcessId: string = '';

  files: File[] = [];

  selectedGenres: string[] = [];

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
  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private router: Router
  ) {}

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

    this.beginUploadProcess();
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

  private async beginUploadProcess() {
    let process: UploadProcess = await this.uploadService.beginUploadProcess();
    console.log(process.id);
    this.uploadProcessId = process.id;
  }

  async addFiles($event: Event) {
    const element = $event.currentTarget as HTMLInputElement;
    const files: FileList | null = element.files;
    if (files === null) return;
    const filesArray = Array.from(files!);
    this.files.push(...filesArray);

    for (let file of filesArray) {
      let result: boolean = await this.uploadService.uploadFile(
        file,
        this.uploadProcessId
      );
    }
  }

  async publishArtwork() {
    const publishArtworkRequest: PublishArtworkRequest = {
      title: this.titleAndDescriptionFormGroup.value['title'],
      artType: this.typeToNumber(this.typeAndCategoryFormGroup.value['type']),
      genres: this.selectedGenres,
      tags: this.tags,
    };
    let success: boolean = await this.uploadService.publishArtwork(
      this.uploadProcessId,
      publishArtworkRequest
    );

    if (success) {
      this.router.navigateByUrl('/my-account');
    }
  }

  private typeToNumber(type: string): number {
    if (type === 'music') return 0;
    if (type === 'literature') return 1;
    if (type === 'photography') return 2;
    return 3;
  }

  setSelected(chip: MatChip) {
    const value = chip.value;
    if (chip.selected) {
      chip.deselect();
      let index = this.selectedGenres.indexOf(value);
      this.selectedGenres.splice(index, 1);

      return;
    }
    chip.select();
    this.selectedGenres.push(value);
  }
}

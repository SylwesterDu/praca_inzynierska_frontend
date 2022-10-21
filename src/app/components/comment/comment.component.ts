import { Component, Input, OnInit } from '@angular/core';

interface Comment {
  id: string;
  creator: string;
  creatorId: string;
  content: string;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input()
  commentData?: Comment;

  constructor() {}

  ngOnInit(): void {}
}

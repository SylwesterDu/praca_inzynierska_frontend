import { Component, OnInit } from '@angular/core';

interface Comment {
  id: string;
  creator: string;
  creatorId: string;
  content: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [
    {
      id: '1',
      creator: 'user1',
      creatorId: '1',
      content:
        'komentarz komentarz komentarz komentarzkomentarz komentarz komentarz komentarzkomentarz komentarz komentarz komentarzkomentarz komentarz komentarz komentarzkomentarz komentarz komentarz komentarzkomentarz komentarz komentarz komentarzkomentarz komentarz komentarz komentarz',
    },
    {
      id: '2',
      creator: 'user2',
      creatorId: '2',
      content: 'komentarz komentarz komentarz komentarz',
    },
    {
      id: '3',
      creator: 'user3',
      creatorId: '3',
      content: 'komentarz komentarz komentarz komentarz',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

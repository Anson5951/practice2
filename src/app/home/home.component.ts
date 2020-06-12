import { Component, OnInit } from '@angular/core';
import { NewsService } from '../service/news.service';
import { News } from '../class/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  newsList: News[];
  selectNews: News;
  display: boolean = false;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.newsService.getNews$().subscribe(
      newsArray => this.newsList = <News[]>newsArray
    )
  }

  showContent(id: number) {
    console.log('input id : ' + id)
    this.selectNews = this.newsList.find(news => news.id === id)
    this.display = true
  }
}

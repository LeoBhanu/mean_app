import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Post from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  title = 'Posting App';

  public post : Post;
  public postList:Post[];

  public constructor(private sanitizer : DomSanitizer) {
    this.post = new Post();

    const sampleImage = new Post();
   
    this.postList= [];
    
  }

  // text posting
  public postText(){
      // this.postList.push(this.post);
      
      this.postList.splice(0,0,this.post);
         
      this.post = new Post();
  }

  public postImage(event){
    const refElement = event.target;
    let uploadedFile = refElement.files[0];
    let uploadedFileUrl = URL.createObjectURL(uploadedFile);
  uploadedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(uploadedFileUrl);

    this.post.postType = 'IMAGE';
    this.post.postValue = uploadedFileUrl;
    this.postList.splice(0,0,this.post);
    this.post = new Post();


  }

  public postVideo(event){
    const refElement = event.target;
    let uploadedFile = refElement.files[0];
    let uploadedFileUrl = URL.createObjectURL(uploadedFile);
  uploadedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(uploadedFileUrl);

    this.post.postType = 'VIDEO';
    this.post.postValue = uploadedFileUrl;
    this.postList.splice(0,0,this.post);
    this.post = new Post();


  }

  public likeCount(item:Post){
    item.likeCount +=1;
  }

  public addComment(item:Post){
    
    item.commentList.push('thank you');
  }
public deletePost(item){
  this.postList.splice(item,1);
}

  ngOnInit(): void {
  }

}

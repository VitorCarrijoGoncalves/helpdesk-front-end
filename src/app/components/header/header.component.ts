import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public shared: SharedService;

  constructor(private userService: UserService,
    private router: Router) {
    this.shared = SharedService.getInstance();
    this.shared.user = new User('1', 'aaa@email.com', '123', 'CUSTOMER');
   }

  ngOnInit() {
  }

  signOut(): void {
    this.shared.token = null;
    this.shared.user = null;
    window.location.href = '/login';
    window.location.reload();
  }

}

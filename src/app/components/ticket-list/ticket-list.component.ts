import { ResponseApi, ResponseApi } from './../../model/response-api';
import { Router } from '@angular/router';
import { TicketService } from './../../services/ticket.service';
import { DialogService } from './../../services/dialog.service';
import { Ticket } from './../../model/ticket.model';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  assignedToMe: boolean = false;
  page: number = 0;
  count: number = 5;
  pages: Array<number>;
  shared: SharedService;
  message : {};
  classCss : {};
  listTicket = [];
  ticketFilter = new Ticket('', null, '', '', '', '', null, null, '', null);

  constructor(
    private dialogService: DialogService,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.ticketService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listTicket = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage ({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  filter(): void {
    this.page = 0;
    this.count = 5;
    this.ticketService.findByParams(this.page, this.count, this.assignedToMe, this.ticketFilter)
    .subscribe((responseApi: ResponseApi) => {
      this.ticketFilter.title = this.ticketFilter.title === 'uninformed' ? '' : this.ticketFilter.title;
      this.ticketFilter.number = this.ticketFilter.number === 0 ? null : this.ticketFilter.number;
      this.listTicket = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage ({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    };

    this.classCss['alert-' + type] = true;
  }

}

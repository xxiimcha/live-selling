import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatOwnerComponent } from '../pages/chat-owner-component/chat-owner.component';

@NgModule({
    declarations: [
        ChatOwnerComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ChatOwnerComponent
    ]
})
export class ChatModule { }

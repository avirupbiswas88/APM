import { Component, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector:'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges{

    ngOnChanges(): number {
        return this.starWidth = this.rating * 75 / 5;
    }
    //input/output decorator
    @Input() rating: number;
    //property binding
    starWidth: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    //event binding
    onClick(): void{
       // console.log('clicked on rating '+this.rating);
       this.ratingClicked.emit('clicked on rating '+this.rating);
    }

}
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Profile, RequestHeader } from 'src/app/domain/profile.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.scss']
})
export class EditHeaderComponent implements OnInit {

  @Input() header: RequestHeader;

  @Output() persistHeaderEvent: EventEmitter<RequestHeader> = new EventEmitter<RequestHeader>();
  @Output() dismissEvent: EventEmitter<void> = new EventEmitter<void>();

  headerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.headerForm = this.formBuilder.group({
      key: this.header.name || '',
      value: this.header.value || '',
      enabled: this.header.enabled || true
    });
  }

  persistHeader(): void {
    this.persistHeaderEvent.emit({
      ...this.header,
      name: this.headerForm.get('key').value,
      value: this.headerForm.get('value').value,
      enabled: this.headerForm.get('value').enabled
    });
  }

  closeModal(): void {
    this.dismissEvent.emit();
  }

}

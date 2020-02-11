import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RequestHeader } from 'src/app/domain/profile.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
      key: new FormControl(this.header.name || '', Validators.required),
      value: new FormControl(this.header.value || '', Validators.required),
      enabled: this.header.enabled || true
    });
  }

  persistHeader(): void {
    if (!this.headerForm.valid) {
      return;
    }

    this.persistHeaderEvent.emit({
      ...this.header,
      name: this.headerForm.get('key').value,
      value: this.headerForm.get('value').value,
      enabled: this.headerForm.get('enabled').value
    });
  }

  closeModal(): void {
    this.dismissEvent.emit();
  }

  hasError(fieldName: string): boolean {
    return !this.headerForm.get(fieldName).valid;
  }

}

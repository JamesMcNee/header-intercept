import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, Output, EventEmitter } from '@angular/core';
import { Profile, RequestHeader } from 'src/app/domain/profile.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { take } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { ArrayUtils } from 'src/app/utils/array.utils';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @ViewChild("editHeaderTemplate", { read: ViewContainerRef, static: true }) editHeaderTemplate: ViewContainerRef;
  componentRef: ComponentRef<EditHeaderComponent>;

  @Input() profile: Profile;

  @Output() persistProfileEvent: EventEmitter<Profile> = new EventEmitter<Profile>();
  @Output() cancelEditingEvent: EventEmitter<void> = new EventEmitter<void>();

  profileForm: FormGroup;
  urlFiltersArray: FormArray;

  constructor(private formBuilder: FormBuilder, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.urlFiltersArray = this.formBuilder.array(this.profile.urlMatches.map(urlMatch => {
      return this.formBuilder.group({
        'url': urlMatch.regex,
        'enabled': urlMatch.enabled
      })
    }));

    this.profileForm = this.formBuilder.group({
      'name': this.profile.name,
      'enabled': this.profile.enabled,
      'urlFilters': this.urlFiltersArray
    });
  }

  addUrlFilter(): void {
    this.urlFiltersArray.push(this.formBuilder.group({
      'url': '',
      'enabled': false
    }));
    console.log(this.urlFiltersArray.getRawValue());
  }

  removeUrlFilter(index: number): void {
    this.urlFiltersArray.removeAt(index);
  }

  editHeader(header?: RequestHeader): void {
    this.editHeaderTemplate.clear(); 
    const factory: ComponentFactory<EditHeaderComponent> = this.resolver.resolveComponentFactory(EditHeaderComponent);
    this.componentRef = this.editHeaderTemplate.createComponent(factory);
    this.componentRef.instance.header = header || { id: Guid.create().toString(), name: '', value: '', enabled: false };

    this.componentRef.instance.dismissEvent.pipe(take(1)).subscribe(() => {
      this.editHeaderTemplate.clear();
    });

    this.componentRef.instance.persistHeaderEvent.pipe(take(1)).subscribe((header) => {
      this.profile.requestHeaders = ArrayUtils.replaceElementWhenMatchFoundElseAppend(header, this.profile.requestHeaders, 'id');
      this.editHeaderTemplate.clear();
    });
  }

  removeHeader(header: RequestHeader): void {
    this.profile.requestHeaders = this.profile.requestHeaders.filter(rh => rh.id !== header.id);
  }

  persistProfile(): void {
    this.persistProfileEvent.emit({
      ...this.profile,
      name: this.profileForm.get('name').value,
      enabled: this.profileForm.get('enabled').value,
      urlMatches: this.urlFiltersArray.getRawValue().map((urlFilter: {url: string, enabled: boolean}) => {
        if (!urlFilter || !urlFilter.url) {
          return undefined;
        }

        return {
          regex: urlFilter.url,
          enabled: urlFilter.enabled
        }
      }).filter(el => !!el)
    });
  }

  cancelEditing(): void {
    this.cancelEditingEvent.emit();
  }

}

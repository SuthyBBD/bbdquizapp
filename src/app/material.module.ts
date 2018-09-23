import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatTabsModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule
  ]
})

export class MaterialModule {}

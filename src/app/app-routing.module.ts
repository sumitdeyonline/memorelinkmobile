import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListjobComponent } from './pages/listjob/listjob.component';
import { JobdetailsComponent } from './pages/jobdetails/jobdetails.component';
import { ApplyjobComponent } from './pages/jobdetails/applyjob/applyjob.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'listjob',
    //loadChildren: () => import('./pages/listjob/listjob.module').then( m => m.ListjobModule)  
    component: ListjobComponent  
  },
  {
    path: 'jobdetails/:id',
    //loadChildren: () => import('./pages/listjob/listjob.module').then( m => m.ListjobModule)  
    component: JobdetailsComponent  
  },
  {
    path: 'applyjob/:id',
    //loadChildren: () => import('./pages/listjob/listjob.module').then( m => m.ListjobModule)  
    component: ApplyjobComponent  
  }   
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import {MatTreeNestedDataSource } from "@angular/material";
import {NestedTreeControl} from '@angular/cdk/tree';
import {TreeItem} from "./model/tree.item";
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
    
  constructor() {
    this.treeSource = new MatTreeNestedDataSource<TreeItem>();     

    // this dataSource is not required but its rly. helpfull to think reactive
    this.dataSource$ = new BehaviorSubject<TreeItem[]>([]);
    this.dataSource$.subscribe(items => {
      this.treeSource.data = null;
      this.treeSource.data = items;
    });

    this.initData();
  }

  /** dummy for getting unique ids */
  private static _id = 0;
  
  /** tree source stuff */
  readonly dataSource$: BehaviorSubject<TreeItem[]>;
  readonly treeSource: MatTreeNestedDataSource<TreeItem>;
  /** tree control */
  readonly treeControl = new NestedTreeControl<TreeItem>(node => node.children );

  readonly hasChild = (_: number, node: TreeItem) => !!node.children && node.children.length > 0;

  readonly trackBy = (_: number, node: TreeItem) => node.id;

  /** destroy */
  ngOnDestroy() {
    this.dataSource$.complete();
  }

  /** init tree data */
  initData() {
    this.dataSource$.next([      
      this._createTreeItem('Parent 1',
          this._createTreeItem('Child 1.1'),
          this._createTreeItem('Child 1.2', this._createTreeItem('Subchild 1.1.1')),
          this._createTreeItem('Child 1.3')
      ),
      this._createTreeItem('Parent 2')
    ])
  }

  /** add */
  add(node?: TreeItem) {
    const newItem = this._createTreeItem(`ManualCreated ${AppComponent._id}`);

    // add as child
    if (node) {
      node.children = [
        ...(node.children || []),
        newItem
      ];
      if (!this.treeControl.isExpanded(node)) {
        this.treeControl.expand(node);
      }
    }
    // add to root
    else {
      this.dataSource$.next([
        ...this.dataSource$.value,
        newItem
      ]);
    }

    this.dataSource$.next(this.dataSource$.value);

    
  }

  /** toggle node */
  toggleNode(node: TreeItem) {
    this.treeControl.toggle(node);
  }

  /** creates a new tree item */
  private _createTreeItem(name: string, ...children: TreeItem[]): TreeItem {
    return {
      id: ++AppComponent._id,
      name: name,
      children: children
    };
  }

}

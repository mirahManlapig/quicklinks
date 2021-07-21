import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SbfQuicklinksWebPartStrings';
import SbfQuicklinks from './components/SbfQuicklinks';
import { ISbfQuicklinksProps } from './components/ISbfQuicklinksProps';
import { sp } from '@pnp/sp';
export interface ISbfQuicklinksWebPartProps {
  listName: string;
}

export default class SbfQuicklinksWebPart extends BaseClientSideWebPart<ISbfQuicklinksWebPartProps> {

  public async render() {
    sp.setup({
      spfxContext: this.context
    });
    let items = await this.getListItems();
    const element: React.ReactElement<ISbfQuicklinksProps> = React.createElement(
      SbfQuicklinks,
      {
        listName: this.properties.listName,
        items: items
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  public async getListItems() {
    const results: any[] = await sp.web.lists.getByTitle(this.properties.listName).items.orderBy('Order0', true).get();
    console.log(results);
    return results;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: 'List Name'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

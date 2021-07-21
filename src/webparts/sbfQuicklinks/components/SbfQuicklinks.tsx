import * as React from 'react';
import styles from './SbfQuicklinks.module.scss';
import { ISbfQuicklinksProps } from './ISbfQuicklinksProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SbfQuicklinks extends React.Component<ISbfQuicklinksProps, {}> {
  public render(): React.ReactElement<ISbfQuicklinksProps> {
    return (<div>
      {this.props.items.map(function (item) {
        return (
          <div style={{ display: "inline-block", width: "5em", textAlign: "center", margin: "1em" }}>
            <a href={item.Redirecturl}><img style={{ width: "5em" }} src={item.Imageurl}></img></a>
            <div style={{ display: "block" }}>
              <div style={{ display: "block" }}>
                <p>{item.Title}</p>
              </div>
            </div>
          </div>)
      })}
    </div>);
  }
}

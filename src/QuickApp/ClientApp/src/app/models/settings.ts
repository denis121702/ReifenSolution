/* Defines the ISettings entity */
export interface ISettings {

    _id: string;
    email: {
      host: string;
      port: string;
      from: string;
      hyperlink: string;
      unsubscribe: string;
      tokenExpires: string;
      auth: {
        user: string;
        pass: string;
      }
    };
    owncloud: {
      username: string;
      password: string;
      url: string;
      searchFolder: string;
      fileName: string;
      successFolderName: string;
    };
    unsubscribes: [{
      label: string;
      description: string;
      value: string;
    }];
}

import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

// Como aqui dentro do Ethereal vc precisa usar um constructor para instanciar (segundo a configuracao), vc precisa usar o registerInstance... ou seja em injecao de depdendencia, sempre que seu codigo for usar algo do constructor que nao esteja injected, ele vai precisar ser registerInstance ao inves do registerSingleton
container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
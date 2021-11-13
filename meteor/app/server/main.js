import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import '/imports/startup/server/Methods';
import '/imports/startup/server/Login';
import '/imports/startup/server/DlnrApp';

import { Trails } from '../imports/api/trail/Trail';


WebApp.connectHandlers.use('/api/trails', (req, res, next) => {
    let trails = Trails.collection.find({}).fetch();
    res.writeHead(200);
    res.end(JSON.stringify(trails));
});

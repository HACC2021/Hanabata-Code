import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import '/imports/startup/server/Methods'

import { Trails } from '../imports/api/trail/Trail';


WebApp.connectHandlers.use('/api/trails', (req, res, next) => {
    let trails = Trails.collection.find({}).fetch();
    res.writeHead(200);
    res.end(JSON.stringify(trails));
});
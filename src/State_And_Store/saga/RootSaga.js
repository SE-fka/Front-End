import { all } from 'redux-saga/effects';
//import mySagaMiddleware from './AuthSaga';
import myInvestigationSagaMiddleware from './InvestigationSaga';
import myTargetAnalysisSagaMiddleware from './TargetAnalysis';


function* rootSaga() {
  yield all([
   // mySagaMiddleware(),
    myInvestigationSagaMiddleware(),
    myTargetAnalysisSagaMiddleware()
    
  ]);
}

export default rootSaga;
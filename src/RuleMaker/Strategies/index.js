import Runner from './Runner';
// preload strategies
import './SBasic';
import './SInheritance';
import './SSibling';
import './SWhiteOrBlackOnly';

export default {
  prepare(...args) {
    return Runner.prepare(...args);
  }
}

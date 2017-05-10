import Runner from './Runner';
// preload strategies
import './SBasic';
import './SInheritance';
import './SSibling';

export default {
  prepare(...args) {
    return Runner.prepare(...args);
  }
}

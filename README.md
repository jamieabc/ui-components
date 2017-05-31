## Compoents

  - [x] Helpers
  - [x] DataTable(wrap react-datagrid)
  - [x] DateRange
  - [x] Resizer
  - [x] Breadcrumb
  - [x] ActionDialog
  - [x] InfoDialog
  - [x] SearchBox
  - [x] InvalidWarning
  - [x] SingleSelector
  - [x] MultiSelector

## Usage

### 1. put `ui-components` in package.json

    "ui-components": "vpon/ui-components"

  then run `npm install` to install it.

### 2. import nesessary component to use

```javascript
// import from top level
import { Helpers, DataTable, DateRange, Resizer, Breadcrumb, ... } from 'ui-compoents';

// Helpers
import Helpers from 'ui-components/lib/utils/Helpers';
import { getParamByName, stringifySort } from 'ui-components/lib/utils/Helpers';

// DataTable
import DataTable, { Pagination } from 'ui-components/lib/DataTable';
import Pagination from 'ui-components/lib/DataTable/Pagination';

// DateRange
import DateRange, { DateHelpers, rangeTypes } from 'ui-components/lib/DateRange';
import DateHelpers from 'ui-components/lib/DateRange/Helpers';

// Resizer
import Resizer, { ResizerHelpers, HResizer, VResizer } from 'ui-components/lib/Resizer';
import ResizerHelpers from 'ui-components/lib/Resizer/Helpers';
import HResizer from 'ui-components/lib/Resizer/HResizer';
import VResizer from 'ui-components/lib/Resizer/VResizer';

// Breadcrumb
import Breadcrumb, { BreadcrumbItem } from 'ui-components/lib/Breadcrumb';

// ActionDialog
import ActionDialog from 'ui-components/lib/ActionDialog';

// InfoDialog
import InfoDialog from 'ui-components/lib/InfoDialog';

// SearchBox
import SearchBox from 'ui-components/lib/SearchBox';

// InvalidWarning
import InvalidWarning from 'ui-components/lib/InvalidWarning';

// SingleSelector
import SingleSelector from 'ui-components/lib/SingleSelector';

// MultiSelector
import MultiSelector from 'ui-components/lib/MultiSelector';

// SelectorWithPanel
import SelectorWithPanel from 'ui-components/lib/SelectorWithPanel';
```

### SelectorWithPanel
![SelectorWithPanelView](https://github.com/quadas/ui-components/blob/628df6550237c3345e65ded7c0713c00a3fbf10d/doc/example/SelectorWithPanelView.png?raw=true)

It will replace the `MultiSelector` which lacks of the support of multi(more than 2) level datasource.

`SelectorWithPanel` consists of two parts named "Selector" and "Panel".
- "Selector" could be used to traverse the given data level by level.
- Those selected items are displayed in a nested form in "Panel".

```
<SelectorWithPanel
  query={this.state.query}
  ancestors={this.state.ancestors}
  dataSource={this.state.dataSource}
  reserved={this.state.reserved}
  selected={this.state.selected}
  text={this.props.text}
  progressBar={<ProgressBar store={ProgressBarStore} id={this.progressBarID} />}

  onUnselectAllConfirm={this.handleUnselectAllConfirm}
  onQuery={this.handleQuery}
  onUpload={this.handleUpload}
  onOverrideSelected={this.handleOverrideSelected}
  onOverrideAncestors={this.handleOverrideAncestors}
/>
```

### RuleMaker
![RuleMakerView](https://github.com/quadas/ui-components/blob/628df6550237c3345e65ded7c0713c00a3fbf10d/doc/example/RuleMakerView.png?raw=true)
[Example](https://github.com/quadas/ui-components/blob/628df6550237c3345e65ded7c0713c00a3fbf10d/doc/example/RuleMakerWrapper.js)

This usually works as a rule generator containg expression such as "China except Anhui and Danshui". That's how the name comes.

`RuleMaker`(R) is a component where a `SelectorWithPanel`(S) underlies. The major difference between R and S is the former one has an additional checkbox identifying "excluded" which is opposited to "included".

It doesn't make sense to have a record both "included" and "excluded".
Thus, special strategies are required to prevent this. For instance, assume we have data like "China > Anhui", if "China" gets selected the "exclude" button of "Anhui" goes disabled.

And to be noted, it is possible to have ad-hoc strategy out of the component. For more detail, please check out the example.

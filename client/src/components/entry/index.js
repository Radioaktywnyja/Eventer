import React from 'react';
import Form from './../form';

const Entry = () => {
    return(
      <div className="col-lg-12 col-md-12" data-test="entryComponent">
        <Form mode="new" row="[]" />
      </div>
    );
}

export default Entry;

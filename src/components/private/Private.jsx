import React from 'react';
import { withAuthRedirect } from '../../hoc/withAuth';

const Private = (props) => {
    return(
        <div>
            <h1>Private</h1>
        </div>
    )
}
export default withAuthRedirect(Private);
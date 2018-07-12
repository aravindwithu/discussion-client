
export class Discussion {
    author: {
        type: String,
        required: 'Kindly enter the author of the discussion'
    };
    title: {
        type: String,
        required: 'Kindly enter the title of the discussion'
    };
    subject: {
        type: String,
        required: 'Kindly enter the subject of the discussion'
    };
    created_date: {
        type: Date,
        default: null
    };
    status: {
        type: [{
        type: String,
        enum: ['new', 'ongoing', 'completed']
        }],
        default: ['new']
    };
}

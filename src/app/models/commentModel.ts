
export class Comment {
    name: {
        type: String,
        required: 'Kindly enter the name of the comment'
    };
    comment: {
        type: String,
        required: 'Kindly enter the comment of the comment'
    };
    created_date: {
        type: Date,
        default: null
    };
}

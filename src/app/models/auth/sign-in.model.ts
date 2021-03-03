export interface Signin {
    token: string,
    user: {
        _id:       string;
        username:  string;
        email:     string;
        createdAt: Date;
        updatedAt: Date;
        __v:       number;
    }    
}
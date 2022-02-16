export class InvalidArgumentException extends Error {
    public static NAME = "Invalid Argument Exception"
    constructor(message: string) {
        super(message);
        this.name = InvalidArgumentException.NAME;
    }
}


export class NotUsableException extends Error {
    public static NAME = "Not usable Exception"
    constructor(message: string = "Not all requirements are fulfilled") {
        super(message)
        this.name = NotUsableException.NAME
    }

}
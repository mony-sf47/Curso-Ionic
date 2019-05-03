export class Item {
    constructor(
        public titulo: string,
        public contenido: string,
    ) {}
}

export class NotaData {
    constructor(
        public pageIndex: number,
        public pageSize: number,
        public count: number,
        public data: NotaItem[]
    ) {}
}

export class NotaItem {
    constructor(
        public Id: string,
        public Titulo: string,
        public Contenido: string,
        public FechaCreacion: Date,
        public id: string
    ) {}
}

export interface Permission {
    read: boolean;
    create: boolean;
    delete?: boolean;
    update?: boolean;
}

export interface Users {
    name: string;
    id: string;
    permission?: Permission;
    admin?: boolean;
}

export const users: Users[] = [
    {
        id: "1",
        name: "John",
        permission: {
            read: true,
            create: true,
            delete: false,
            update: true
        }
    },
    {
        name: "Mary",
        id: "2",
        permission: {
            read: true,
            create: false,
            delete: false,
            update: true
        }
    },
    {
        name: "Tom",
        id: "3",
        permission: {
            read: false,
            create: true,
            delete: false,
            update: true
        }
    },
    {
        name: "Admin",
        id: "4",
        admin: true
    }
];

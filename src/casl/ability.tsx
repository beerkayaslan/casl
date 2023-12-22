import React from "react";
import { AbilityBuilder, MongoAbility, createMongoAbility } from '@casl/ability';
import { createContextualCan } from "@casl/react";
import { useTodoStore } from "../store/useTodoStore.ts";
export type CaslActions =
    | 'manage'
    | 'create'
    | 'read'
    | 'update'
    | 'delete'
    | 'upload'
    | 'download';

export type CaslSubjects =
    | 'Todo'
    | 'Image';

export type CanvasAbilitiesType = MongoAbility<[CaslActions, CaslSubjects | { userId: string }]>;
export const AbilityContext = React.createContext<CanvasAbilitiesType>({} as unknown as CanvasAbilitiesType);
export const Can = createContextualCan<CanvasAbilitiesType>(AbilityContext.Consumer);
export default function AbilityProvider({ children }: { children: React.ReactNode }){

    const { user } = useTodoStore((state) => state);

    const buildAbilities = React.useCallback(() => {
        const builder = new AbilityBuilder<CanvasAbilitiesType>(createMongoAbility);
        const { can } = builder;

        can('read', 'Todo', { userId: user.id });
        can('delete', 'Todo', { userId: user.id });
        can('update', 'Todo', { userId: user.id });

        if(user.permission?.create){
            can('create', 'Todo');
        }

        if(user.admin){
            can('read', 'Todo');
            can('delete', 'Todo');
            can('update', 'Todo');
            can("create", "Todo");
        }

        if(user.permission?.read){
            can('read', 'Todo');
        }

        return builder.build();
    }, [user]);

    const [ability, setAbility] = React.useState<CanvasAbilitiesType | null>(null);

    React.useEffect(() => {
        setAbility(buildAbilities());
    }, [buildAbilities]);

    if (ability === null) return null;


    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
}

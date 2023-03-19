// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import {
    type MoveCallSuiCommand,
    type SuiArgument,
    type SuiMovePackage,
} from '@mysten/sui.js';
import { type StoryObj, type Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { RpcClientContext } from '../../../../core';

import {
    Command,
    CommandType,
    type ICommandProps,
} from '~/pages/transaction-result/programmable-transaction-view/Command';
import { DefaultRpcClient, Network } from '~/utils/api/DefaultRpcClient';

export default {
    title: 'ProgrammableTransaction',
    component: Command,
    decorators: [
        (Story) => (
            <QueryClientProvider client={new QueryClient()}>
                <BrowserRouter>
                    <RpcClientContext.Provider
                        value={DefaultRpcClient(Network.LOCAL)}
                    >
                        <Story />
                    </RpcClientContext.Provider>
                </BrowserRouter>
            </QueryClientProvider>
        ),
    ],
} as Meta;

export const SplitCoin: StoryObj<ICommandProps<SuiArgument[]>> = {
    args: { type: CommandType.SplitCoin, data: ['GasCoin', { Input: 1 }] },
};

export const TransferObjects: StoryObj<
    ICommandProps<(SuiArgument | SuiArgument[])[]>
> = {
    args: {
        type: CommandType.TransferObjects,
        data: [
            [
                {
                    Result: 0,
                },
                {
                    Result: 1,
                },
                {
                    Result: 2,
                },
                {
                    Result: 3,
                },
                {
                    Result: 4,
                },
            ],
            {
                Input: 0,
            },
        ],
    },
};

export const MergeCoins: StoryObj<
    ICommandProps<(SuiArgument | SuiArgument[])[]>
> = {
    args: {
        type: CommandType.MergeCoins,
        data: [
            {
                Input: 0,
            },
            [
                {
                    Result: 0,
                },
                {
                    Result: 1,
                },
                {
                    Result: 2,
                },
                {
                    Result: 3,
                },
                {
                    Result: 4,
                },
            ],
        ],
    },
};

export const Publish: StoryObj<ICommandProps<SuiMovePackage>> = {
    args: {
        type: CommandType.Publish,
        data: {
            disassembled: {
                boars: '// Move bytecode v6\nmodule 0.boars {\nuse 0000000000000000000000000000000000000000000000000000000000000001::option;\nuse 0000000000000000000000000000000000000000000000000000000000000001::string;\nuse 0000000000000000000000000000000000000000000000000000000000000002::display;\nuse 0000000000000000000000000000000000000000000000000000000000000002::object;\nuse 0000000000000000000000000000000000000000000000000000000000000002::package;\nuse 0000000000000000000000000000000000000000000000000000000000000002::transfer;\nuse 0000000000000000000000000000000000000000000000000000000000000002::tx_context;\nuse 0000000000000000000000000000000000000000000000000000000000000002::types;\nuse 0000000000000000000000000000000000000000000000000000000000000002::url;\n\n\nstruct BOARS has drop {\n\tdummy_field: bool\n}\nstruct Boar has store, key {\n\tid: UID,\n\timg_url: String,\n\tname: String,\n\tdescription: String,\n\tcreator: Option<String>,\n\tprice: Option<String>,\n\tmetadata: Metadata,\n\tbuyer: address,\n\tfull_url: Url\n}\nstruct Metadata has store {\n\tage: u64\n}\n\ninit(Arg0: BOARS, Arg1: &mut TxContext) {\nB0:\n\t0: ImmBorrowLoc[0](Arg0: BOARS)\n\t1: Call types::is_one_time_witness<BOARS>(&BOARS): bool\n\t2: BrFalse(4)\nB1:\n\t3: Branch(8)\nB2:\n\t4: MoveLoc[1](Arg1: &mut TxContext)\n\t5: Pop\n\t6: LdConst[0](U64: [0, 0, 0, 0, 0, 0, 0, 0])\n\t7: Abort\nB3:\n\t8: MoveLoc[0](Arg0: BOARS)\n\t9: CopyLoc[1](Arg1: &mut TxContext)\n\t10: Call package::claim<BOARS>(BOARS, &mut TxContext): Publisher\n\t11: StLoc[3](loc1: Publisher)\n\t12: ImmBorrowLoc[3](loc1: Publisher)\n\t13: CopyLoc[1](Arg1: &mut TxContext)\n\t14: Call display::new<Boar>(&Publisher, &mut TxContext): Display<Boar>\n\t15: StLoc[2](loc0: Display<Boar>)\n\t16: MutBorrowLoc[2](loc0: Display<Boar>)\n\t17: LdConst[1](Vector(U8): [4, 110, 97, 109, 101])\n\t18: Call string::utf8(vector<u8>): String\n\t19: LdConst[2](Vector(U8): [11, 100, 101, 115, 99, 114, 105, 112, 116, 105, 111, 110])\n\t20: Call string::utf8(vector<u8>): String\n\t21: LdConst[3](Vector(U8): [7, 105, 109, 103, 95, 117, 114, 108])\n\t22: Call string::utf8(vector<u8>): String\n\t23: LdConst[4](Vector(U8): [7, 99, 114, 101, 97, 116, 111, 114])\n\t24: Call string::utf8(vector<u8>): String\n\t25: LdConst[5](Vector(U8): [5, 112, 114, 105, 99, 101])\n\t26: Call string::utf8(vector<u8>): String\n\t27: LdConst[6](Vector(U8): [11, 112, 114, 111, 106, 101, 99, 116, 95, 117, 114, 108])\n\t28: Call string::utf8(vector<u8>): String\n\t29: LdConst[7](Vector(U8): [3, 97, 103, 101])\n\t30: Call string::utf8(vector<u8>): String\n\t31: LdConst[8](Vector(U8): [5, 98, 117, 121, 101, 114])\n\t32: Call string::utf8(vector<u8>): String\n\t33: LdConst[9](Vector(U8): [8, 102, 117, 108, 108, 95, 117, 114, 108])\n\t34: Call string::utf8(vector<u8>): String\n\t35: LdConst[10](Vector(U8): [13, 101, 115, 99, 97, 112, 101, 95, 115, 121, 110, 116, 97, 120])\n\t36: Call string::utf8(vector<u8>): String\n\t37: VecPack(12, 10)\n\t38: LdConst[11](Vector(U8): [6, 123, 110, 97, 109, 101, 125])\n\t39: Call string::utf8(vector<u8>): String\n\t40: LdConst[12](Vector(U8): [58, 85, 110, 105, 113, 117, 101, 32, 66, 111, 97, 114, 32, 102, 114, 111, 109, 32, 116, 104, 101, 32, 66, 111, 97, 114, 115, 32, 99, 111, 108, 108, 101, 99, 116, 105, 111, 110, 32, 119, 105, 116, 104, 32, 123, 110, 97, 109, 101, 125, 32, 97, 110, 100, 32, 123, 105, 100, 125])\n\t41: Call string::utf8(vector<u8>): String\n\t42: LdConst[13](Vector(U8): [32, 104, 116, 116, 112, 115, 58, 47, 47, 103, 101, 116, 45, 97, 45, 98, 111, 97, 114, 46, 99, 111, 109, 47, 123, 105, 109, 103, 95, 117, 114, 108, 125])\n\t43: Call string::utf8(vector<u8>): String\n\t44: LdConst[14](Vector(U8): [9, 123, 99, 114, 101, 97, 116, 111, 114, 125])\n\t45: Call string::utf8(vector<u8>): String\n\t46: LdConst[15](Vector(U8): [7, 123, 112, 114, 105, 99, 101, 125])\n\t47: Call string::utf8(vector<u8>): String\n\t48: LdConst[16](Vector(U8): [23, 104, 116, 116, 112, 115, 58, 47, 47, 103, 101, 116, 45, 97, 45, 98, 111, 97, 114, 46, 99, 111, 109, 47])\n\t49: Call string::utf8(vector<u8>): String\n\t50: LdConst[17](Vector(U8): [14, 123, 109, 101, 116, 97, 100, 97, 116, 97, 46, 97, 103, 101, 125])\n\t51: Call string::utf8(vector<u8>): String\n\t52: LdConst[18](Vector(U8): [7, 123, 98, 117, 121, 101, 114, 125])\n\t53: Call string::utf8(vector<u8>): String\n\t54: LdConst[19](Vector(U8): [10, 123, 102, 117, 108, 108, 95, 117, 114, 108, 125])\n\t55: Call string::utf8(vector<u8>): String\n\t56: LdConst[20](Vector(U8): [8, 92, 123, 110, 97, 109, 101, 92, 125])\n\t57: Call string::utf8(vector<u8>): String\n\t58: VecPack(12, 10)\n\t59: Call display::add_multiple<Boar>(&mut Display<Boar>, vector<String>, vector<String>)\n\t60: MoveLoc[2](loc0: Display<Boar>)\n\t61: CopyLoc[1](Arg1: &mut TxContext)\n\t62: FreezeRef\n\t63: Call tx_context::sender(&TxContext): address\n\t64: Call transfer::transfer<Display<Boar>>(Display<Boar>, address)\n\t65: MoveLoc[3](loc1: Publisher)\n\t66: CopyLoc[1](Arg1: &mut TxContext)\n\t67: FreezeRef\n\t68: Call tx_context::sender(&TxContext): address\n\t69: Call transfer::transfer<Publisher>(Publisher, address)\n\t70: CopyLoc[1](Arg1: &mut TxContext)\n\t71: Call object::new(&mut TxContext): UID\n\t72: LdConst[21](Vector(U8): [9, 102, 105, 114, 115, 116, 46, 112, 110, 103])\n\t73: Call string::utf8(vector<u8>): String\n\t74: LdConst[22](Vector(U8): [10, 70, 105, 114, 115, 116, 32, 66, 111, 97, 114])\n\t75: Call string::utf8(vector<u8>): String\n\t76: LdConst[23](Vector(U8): [37, 70, 105, 114, 115, 116, 32, 66, 111, 97, 114, 32, 102, 114, 111, 109, 32, 116, 104, 101, 32, 66, 111, 97, 114, 115, 32, 99, 111, 108, 108, 101, 99, 116, 105, 111, 110, 33])\n\t77: Call string::utf8(vector<u8>): String\n\t78: LdConst[24](Vector(U8): [5, 67, 104, 114, 105, 115])\n\t79: Call string::utf8(vector<u8>): String\n\t80: Call option::some<String>(String): Option<String>\n\t81: Call option::none<String>(): Option<String>\n\t82: LdU64(10)\n\t83: Pack[2](Metadata)\n\t84: CopyLoc[1](Arg1: &mut TxContext)\n\t85: FreezeRef\n\t86: Call tx_context::sender(&TxContext): address\n\t87: LdConst[25](Vector(U8): [31, 104, 116, 116, 112, 115, 58, 47, 47, 103, 101, 116, 45, 97, 45, 98, 111, 97, 114, 46, 102, 117, 108, 108, 117, 114, 108, 46, 99, 111, 109, 47])\n\t88: Call url::new_unsafe_from_bytes(vector<u8>): Url\n\t89: Pack[1](Boar)\n\t90: MoveLoc[1](Arg1: &mut TxContext)\n\t91: FreezeRef\n\t92: Call tx_context::sender(&TxContext): address\n\t93: Call transfer::transfer<Boar>(Boar, address)\n\t94: Ret\n}\n}',
            },
        },
    },
};

export const MakeMoveVec: StoryObj<
    ICommandProps<(SuiArgument | SuiArgument[])[]>
> = {
    args: {
        type: CommandType.MakeMoveVec,
        data: [
            [
                {
                    Result: 0,
                },
                {
                    Result: 1,
                },
                {
                    Result: 2,
                },
                {
                    Result: 3,
                },
                {
                    Result: 4,
                },
            ],
        ],
    },
};

export const MoveCall: StoryObj<ICommandProps<MoveCallSuiCommand>> = {
    args: {
        type: CommandType.MoveCall,
        data: {
            package:
                '0xb17c941e827d5d0e9c94ec40fedd7f3b50b505c397fff50c605ee82eeb45ab04',
            module: 'serializer_tests',
            function: 'value',
            arguments: [
                {
                    Input: 0,
                },
            ],
        },
    },
};

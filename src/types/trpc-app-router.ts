export declare const appRouter: import('@trpc/server').CreateRouterInner<
  import('@trpc/server').RootConfig<{
    ctx: {
      req: import('express').Request<
        import('express-serve-static-core').ParamsDictionary,
        any,
        any,
        import('qs').ParsedQs,
        Record<string, any>
      >;
      res: import('express').Response<any, Record<string, any>>;
      user: {
        _id: import('bson').ObjectId;
        username: any;
      } | null;
    };
    meta: object;
    errorShape: import('@trpc/server').DefaultErrorShape;
    transformer: import('@trpc/server').DefaultDataTransformer;
  }>,
  {
    auth: import('@trpc/server').CreateRouterInner<
      import('@trpc/server').RootConfig<{
        ctx: {
          req: import('express').Request<
            import('express-serve-static-core').ParamsDictionary,
            any,
            any,
            import('qs').ParsedQs,
            Record<string, any>
          >;
          res: import('express').Response<any, Record<string, any>>;
          user: {
            _id: import('bson').ObjectId;
            username: any;
          } | null;
        };
        meta: object;
        errorShape: import('@trpc/server').DefaultErrorShape;
        transformer: import('@trpc/server').DefaultDataTransformer;
      }>,
      {
        register: import('@trpc/server').BuildProcedure<
          'mutation',
          {
            _config: import('@trpc/server').RootConfig<{
              ctx: {
                req: import('express').Request<
                  import('express-serve-static-core').ParamsDictionary,
                  any,
                  any,
                  import('qs').ParsedQs,
                  Record<string, any>
                >;
                res: import('express').Response<any, Record<string, any>>;
                user: {
                  _id: import('bson').ObjectId;
                  username: any;
                } | null;
              };
              meta: object;
              errorShape: import('@trpc/server').DefaultErrorShape;
              transformer: import('@trpc/server').DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: import('express').Request<
                import('express-serve-static-core').ParamsDictionary,
                any,
                any,
                import('qs').ParsedQs,
                Record<string, any>
              >;
              res: import('express').Response<any, Record<string, any>>;
              user: {
                _id: import('bson').ObjectId;
                username: any;
              } | null;
            };
            _input_in: {
              username: string;
              password: string;
            };
            _input_out: {
              username: string;
              password: string;
            };
            _output_in: typeof import('@trpc/server').unsetMarker;
            _output_out: typeof import('@trpc/server').unsetMarker;
          },
          {
            _id: string;
            username: string;
          }
        >;
        login: import('@trpc/server').BuildProcedure<
          'mutation',
          {
            _config: import('@trpc/server').RootConfig<{
              ctx: {
                req: import('express').Request<
                  import('express-serve-static-core').ParamsDictionary,
                  any,
                  any,
                  import('qs').ParsedQs,
                  Record<string, any>
                >;
                res: import('express').Response<any, Record<string, any>>;
                user: {
                  _id: import('bson').ObjectId;
                  username: any;
                } | null;
              };
              meta: object;
              errorShape: import('@trpc/server').DefaultErrorShape;
              transformer: import('@trpc/server').DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: import('express').Request<
                import('express-serve-static-core').ParamsDictionary,
                any,
                any,
                import('qs').ParsedQs,
                Record<string, any>
              >;
              res: import('express').Response<any, Record<string, any>>;
              user: {
                _id: import('bson').ObjectId;
                username: any;
              } | null;
            };
            _input_in: {
              username: string;
              password: string;
            };
            _input_out: {
              username: string;
              password: string;
            };
            _output_in: typeof import('@trpc/server').unsetMarker;
            _output_out: typeof import('@trpc/server').unsetMarker;
          },
          {
            _id: string;
            username: any;
          }
        >;
        logout: import('@trpc/server').BuildProcedure<
          'mutation',
          {
            _config: import('@trpc/server').RootConfig<{
              ctx: {
                req: import('express').Request<
                  import('express-serve-static-core').ParamsDictionary,
                  any,
                  any,
                  import('qs').ParsedQs,
                  Record<string, any>
                >;
                res: import('express').Response<any, Record<string, any>>;
                user: {
                  _id: import('bson').ObjectId;
                  username: any;
                } | null;
              };
              meta: object;
              errorShape: import('@trpc/server').DefaultErrorShape;
              transformer: import('@trpc/server').DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: import('express').Request<
                import('express-serve-static-core').ParamsDictionary,
                any,
                any,
                import('qs').ParsedQs,
                Record<string, any>
              >;
              res: import('express').Response<any, Record<string, any>>;
              user: {
                _id: import('bson').ObjectId;
                username: any;
              } | null;
            };
            _input_in: typeof import('@trpc/server').unsetMarker;
            _input_out: typeof import('@trpc/server').unsetMarker;
            _output_in: typeof import('@trpc/server').unsetMarker;
            _output_out: typeof import('@trpc/server').unsetMarker;
          },
          {
            success: boolean;
          }
        >;
        checkAuth: import('@trpc/server').BuildProcedure<
          'query',
          {
            _config: import('@trpc/server').RootConfig<{
              ctx: {
                req: import('express').Request<
                  import('express-serve-static-core').ParamsDictionary,
                  any,
                  any,
                  import('qs').ParsedQs,
                  Record<string, any>
                >;
                res: import('express').Response<any, Record<string, any>>;
                user: {
                  _id: import('bson').ObjectId;
                  username: any;
                } | null;
              };
              meta: object;
              errorShape: import('@trpc/server').DefaultErrorShape;
              transformer: import('@trpc/server').DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: import('express').Request<
                import('express-serve-static-core').ParamsDictionary,
                any,
                any,
                import('qs').ParsedQs,
                Record<string, any>
              >;
              res: import('express').Response<any, Record<string, any>>;
              user: {
                _id: import('bson').ObjectId;
                username: any;
              } | null;
            };
            _input_in: typeof import('@trpc/server').unsetMarker;
            _input_out: typeof import('@trpc/server').unsetMarker;
            _output_in: typeof import('@trpc/server').unsetMarker;
            _output_out: typeof import('@trpc/server').unsetMarker;
          },
          {
            _id: import('bson').ObjectId;
            username: any;
          } | null
        >;
      }
    >;
  }
>;
export type AppRouter = typeof appRouter;

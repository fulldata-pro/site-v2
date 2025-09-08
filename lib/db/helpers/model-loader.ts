import connectDB from '../mongodb';

export async function getModels() {
  await connectDB();
  
  const models = {
    Admin: (await import('@/lib/db/models/admin.schema')).default,
    User: (await import('@/lib/db/models/user.schema')).default,
    Account: (await import('@/lib/db/models/account.schema')).default,
    Receipt: (await import('@/lib/db/models/receipt.schema')).default,
    Statement: (await import('@/lib/db/models/statement.schema')).default,
    Movement: (await import('@/lib/db/models/movement.schema')).default,
    Request: (await import('@/lib/db/models/request.schema')).default,
    Proxy: (await import('@/lib/db/models/proxy.schema')).default,
    Benefit: (await import('@/lib/db/models/benefit.schema')).default,
    Referral: (await import('@/lib/db/models/referral.schema')).default,
    AccountApi: (await import('@/lib/db/models/account-api.schema')).default,
    Country: (await import('@/lib/db/models/country.schema')).default,
    Province: (await import('@/lib/db/models/province.schema')).default,
    Currency: (await import('@/lib/db/models/currency.schema')).default,
    PaymentMethod: (await import('@/lib/db/models/payment-method.schema')).default,
    File: (await import('@/lib/db/models/file.schema')).default,
    Parameter: (await import('@/lib/db/models/parameter.schema')).default,
    AccountTag: (await import('@/lib/db/models/account-tag.schema')).default,
    Invitation: (await import('@/lib/db/models/invitation.schema')).default,
    Config: (await import('@/lib/db/models/config.schema')).default,
  };

  return models;
}

export async function getModel<T = any>(modelName: string) {
  const models = await getModels();
  return models[modelName as keyof typeof models] as T;
}
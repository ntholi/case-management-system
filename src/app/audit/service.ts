export function auditLog(model: string, operation: string, args: any) {
  console.log(
    `Audit: ${operation} ${model} with args: ${JSON.stringify(args)}`
  );
}
